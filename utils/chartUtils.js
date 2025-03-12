/**
 * Prepares checkpoint data for environmental data charts
 * @param {Object} shipment - The shipment object containing checkpoints
 * @returns {Array} Formatted data points for charts
 */
export const prepareChartData = (shipment) => {
  if (!shipment || !shipment.checkpoints) return [];

  // Filter checkpoints with environmental data
  const dataPoints = shipment.checkpoints
    .filter(checkpoint => checkpoint.envData)
    .map(checkpoint => {
      // Format date and time for display
      let formattedDate = "Unknown";
      try {
        // Try to extract and format date in a safe way
        const dateStr = checkpoint.time;

        // Parse the date
        let dateObj = new Date(dateStr);

        // Try different formats if the direct parsing fails
        if (isNaN(dateObj.getTime()) && dateStr.includes('/')) {
          // Handle MM/DD/YYYY format
          const [month, day, yearTime] = dateStr.split('/');
          const [year, time] = yearTime ? yearTime.split(' ') : ["", ""];
          const timeStr = time || "";
          dateObj = new Date(`${month}/${day}/${year} ${timeStr}`);
        }

        // Check if date is valid before formatting
        if (!isNaN(dateObj.getTime())) {
          const month = dateObj.toLocaleString('default', { month: 'short' });
          const day = dateObj.getDate();

          // Format time in 12-hour format without leading zeros
          let hours = dateObj.getHours();
          const minutes = dateObj.getMinutes().toString().padStart(2, '0');
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'

          formattedDate = `${month} ${day} - ${hours}:${minutes}${ampm}`;
        } else {
          // If parsing fails completely, try to clean up the original string
          if (dateStr.includes(',')) {
            // If there's a comma, it might be in a format like "Mar 11, 2025 9:45 AM"
            const parts = dateStr.split(',');
            if (parts.length > 1) {
              formattedDate = parts[0] + ' -' + parts[1].replace(/\d{4}/, '').trim();
            } else {
              formattedDate = dateStr;
            }
          } else {
            formattedDate = dateStr;
          }
        }
      } catch (e) {
        console.error("Error parsing date:", e);
        formattedDate = checkpoint.time; // Fallback to original string
      }

      return {
        name: formattedDate,
        fullTime: checkpoint.time,
        location: checkpoint.location,
        temperature: checkpoint.envData.temperature,
        humidity: checkpoint.envData.humidity,
        lux: checkpoint.envData.lux,
        batteryLife: checkpoint.envData.batteryLife,
        status: checkpoint.status,
        // Add flag to highlight current location
        isCurrent: checkpoint.location === shipment.currentLocation
      };
    });

  // Sort data points by timestamp if possible
  return dataPoints.sort((a, b) => {
    // Try to parse dates for proper sorting
    try {
      return new Date(a.fullTime) - new Date(b.fullTime);
    } catch (e) {
      // Fallback to original order if date parsing fails
      return 0;
    }
  });
};

/**
 * Creates custom dot elements for the chart based on data point status
 * @param {Object} props - The dot props from recharts
 * @param {Array} chartData - The chart data array
 * @param {String} dataKey - The data key for the line
 * @param {String} color - The color for regular dots
 * @returns {SVG} SVG element for the custom dot
 */
export const createCustomDot = (props, chartData, dataKey, color) => {
  if (props && props.index !== undefined && chartData) {
    const dataPoint = chartData[props.index];
    return (
      <svg
        key={`dot-${dataKey}-${props.index}`}
        x={props.cx - 6}
        y={props.cy - 6}
        width={12}
        height={12}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          key={`circle-${dataKey}-${props.index}`}
          cx="12"
          cy="12"
          r={dataPoint?.isCurrent ? 6 : 4}
          fill={dataPoint?.isCurrent ? "#3b82f6" : color}
          stroke={dataPoint?.isCurrent ? "#bfdbfe" : "none"}
          strokeWidth={dataPoint?.isCurrent ? 2 : 0}
        />
      </svg>
    );
  }
  return null;
};

/**
 * Creates custom tooltip formatter for the charts
 * @param {String} label - The label format
 * @param {String} unit - The unit of measurement
 * @returns {Function} Formatter function for tooltip
 */
export const createTooltipFormatter = (label, unit) => {
  return (value) => [`${value}${unit}`, label];
};