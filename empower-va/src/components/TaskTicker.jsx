import React, { useState, useEffect } from "react";

const TaskTicker = () => {
    const [count, setCount] = useState(1200);

    useEffect(() => {
        const calculateTaskCount = () => {
            const BASELINE = 1200;
            const START_DATE = new Date("2025-12-20T09:00:00"); // Start of counting
            const now = new Date();

            if (now < START_DATE) {
                setCount(BASELINE);
                return;
            }

            let totalMinutes = 0;
            let current = new Date(START_DATE);

            // Simple iteration to count valid working minutes
            // This is efficient enough for client-side usage over short-medium timeframes
            while (current < now) {
                const day = current.getDay();
                const hour = current.getHours();

                // 0 = Sun, 6 = Sat
                const isWeekend = day === 0 || day === 6;
                // Working hours 9am - 5pm (09:00 to 17:00)
                const isWorkingHours = hour >= 9 && hour < 17;

                if (!isWeekend && isWorkingHours) {
                    totalMinutes++;
                }

                // Advance by 1 minute
                current.setMinutes(current.getMinutes() + 1);
            }

            // Add 1 task for every 10 minutes of working time
            const additionalTasks = Math.floor(totalMinutes / 10);
            setCount(BASELINE + additionalTasks);
        };

        calculateTaskCount();

        // Update every minute to keep it "live" for long sessions
        const interval = setInterval(calculateTaskCount, 60000);

        return () => clearInterval(interval);
    }, []);

    return <span>{count.toLocaleString()}</span>;
};

export default TaskTicker;
