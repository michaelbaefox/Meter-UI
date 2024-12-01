import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

interface MeterUpdate {
  value: number;
  timestamp: number;
  userId: string;
  type: 'manual' | 'auto' | 'system';
  change: number;
}

interface MeterAnalytics {
  average: number;
  min: number;
  max: number;
  trend: 'up' | 'down' | 'stable';
  changeRate: number;
}

interface MeterContextType {
  currentValue: number;
  history: MeterUpdate[];
  analytics: MeterAnalytics;
  adjustMeter: (adjustment: number, type?: 'manual' | 'auto' | 'system') => void;
  isAdjusting: boolean;
  setIsAdjusting: (value: boolean) => void;
  error: string | null;
}

const MeterContext = createContext<MeterContextType>({
  currentValue: 0,
  history: [],
  analytics: {
    average: 0,
    min: 0,
    max: 0,
    trend: 'stable',
    changeRate: 0,
  },
  adjustMeter: () => {},
  isAdjusting: false,
  setIsAdjusting: () => {},
  error: null,
});

export const useMeterContext = () => useContext(MeterContext);

const METER_LIMITS = {
  min: 0,
  max: 100,
  maxAdjustment: 20,
  minUpdateInterval: 500, // ms
};

export const MeterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentValue, setCurrentValue] = useState(50);
  const [history, setHistory] = useState<MeterUpdate[]>([]);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastUpdateTime = useRef(Date.now());
  const updateQueue = useRef<number[]>([]);

  // Calculate analytics based on history
  const analytics = React.useMemo((): MeterAnalytics => {
    if (history.length === 0) {
      return {
        average: currentValue,
        min: currentValue,
        max: currentValue,
        trend: 'stable',
        changeRate: 0,
      };
    }

    const values = history.map(h => h.value);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Calculate trend based on recent history
    const recentHistory = history.slice(-5);
    const changes = recentHistory.map(h => h.change);
    const averageChange = changes.reduce((a, b) => a + b, 0) / changes.length;
    
    const trend = Math.abs(averageChange) < 0.1 
      ? 'stable' 
      : averageChange > 0 
        ? 'up' 
        : 'down';

    // Calculate change rate (units per minute)
    const timeSpan = (history[history.length - 1].timestamp - history[0].timestamp) / 1000 / 60;
    const totalChange = Math.abs(history[history.length - 1].value - history[0].value);
    const changeRate = timeSpan > 0 ? totalChange / timeSpan : 0;

    return {
      average: Number(average.toFixed(2)),
      min,
      max,
      trend,
      changeRate: Number(changeRate.toFixed(2)),
    };
  }, [history, currentValue]);

  // Process queued updates
  useEffect(() => {
    const processQueue = () => {
      if (updateQueue.current.length > 0) {
        const now = Date.now();
        if (now - lastUpdateTime.current >= METER_LIMITS.minUpdateInterval) {
          const totalAdjustment = updateQueue.current.reduce((a, b) => a + b, 0);
          setCurrentValue(prev => {
            const newValue = Math.max(
              METER_LIMITS.min,
              Math.min(METER_LIMITS.max, prev + totalAdjustment)
            );
            return newValue;
          });
          updateQueue.current = [];
          lastUpdateTime.current = now;
        }
      }
    };

    const interval = setInterval(processQueue, METER_LIMITS.minUpdateInterval);
    return () => clearInterval(interval);
  }, []);

  // Load initial value from localStorage
  useEffect(() => {
    const savedValue = localStorage.getItem('meter-value');
    if (savedValue) {
      setCurrentValue(Number(savedValue));
    }
  }, []);

  // Save value to localStorage
  useEffect(() => {
    localStorage.setItem('meter-value', String(currentValue));
  }, [currentValue]);

  // Simulated real-time updates
  useEffect(() => {
    if (!isAdjusting) {
      const interval = setInterval(() => {
        const fluctuation = (Math.random() - 0.5) * 2;
        adjustMeter(fluctuation, 'auto');
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAdjusting]);

  const adjustMeter = useCallback((adjustment: number, type: 'manual' | 'auto' | 'system' = 'manual') => {
    // Validate adjustment
    if (Math.abs(adjustment) > METER_LIMITS.maxAdjustment) {
      setError(`Maximum adjustment is ±${METER_LIMITS.maxAdjustment}`);
      return;
    }

    // Clear previous error
    setError(null);

    // Queue the update
    updateQueue.current.push(adjustment);

    // Record the update in history
    const update: MeterUpdate = {
      value: currentValue + adjustment,
      timestamp: Date.now(),
      userId: 'user-1', // In a real app, this would come from auth
      type,
      change: adjustment,
    };
    
    setHistory(prev => [...prev, update].slice(-50)); // Keep last 50 updates
  }, [currentValue]);

  return (
    <MeterContext.Provider value={{
      currentValue,
      history,
      analytics,
      adjustMeter,
      isAdjusting,
      setIsAdjusting,
      error,
    }}>
      {children}
    </MeterContext.Provider>
  );
}; 