import { useEffect, useState, useRef } from "react";

function BackgroundAnimation() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
    speed: number;
    direction: number;
  }>>([]);

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial dimensions
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create background elements when dimensions change
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const elementCount = Math.min(Math.floor(dimensions.width * 0.08), 100);
    const newElements = [];
    
    for (let i = 0; i < elementCount; i++) {
      newElements.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 4 + 2,
        color: `rgb(${100 + Math.floor(Math.random() * 100)}, ${100 + Math.floor(Math.random() * 100)}, ${200 + Math.floor(Math.random() * 55)})`,
        opacity: 0.1 + Math.random() * 0.3,
        speed: 0.2 + Math.random() * 0.5,
        direction: Math.random() * Math.PI * 2,
      });
    }
    
    setElements(newElements);
  }, [dimensions]);

  // Animation loop
  useEffect(() => {
    if (elements.length === 0 || !dimensions.width) return;

    let animationFrameId: number;
    let lastTimestamp: number;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      setElements(prevElements => 
        prevElements.map(el => {
          // Move element based on speed and direction
          let newX = el.x + Math.cos(el.direction) * el.speed * (deltaTime / 16);
          let newY = el.y + Math.sin(el.direction) * el.speed * (deltaTime / 16);
          
          // Wrap around edges
          if (newX < -10) newX = dimensions.width + 10;
          if (newX > dimensions.width + 10) newX = -10;
          if (newY < -10) newY = dimensions.height + 10;
          if (newY > dimensions.height + 10) newY = -10;
          
          return { ...el, x: newX, y: newY };
        })
      );
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [elements.length, dimensions]);

  // Generate connections between nearby elements
  const connections = [];
  const maxDistance = 120;

  if (elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      for (let j = i + 1; j < elements.length; j++) {
        const dx = elements[i].x - elements[j].x;
        const dy = elements[i].y - elements[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.3;
          connections.push({
            id: `${i}-${j}`,
            x1: elements[i].x,
            y1: elements[i].y,
            x2: elements[j].x,
            y2: elements[j].y,
            opacity
          });
        }
      }
    }
  }

  return (
    <svg 
      ref={svgRef}
      className="fixed inset-0 bg-transparent z-[-1]"
      width={dimensions.width}
      height={dimensions.height}
    >
      {/* Draw connections */}
      {connections.map(conn => (
        <line
          key={conn.id}
          x1={conn.x1}
          y1={conn.y1}
          x2={conn.x2}
          y2={conn.y2}
          stroke="#8c8cff"
          strokeOpacity={conn.opacity}
          strokeWidth={0.5}
        />
      ))}
      
      {/* Draw elements */}
      {elements.map(el => (
        <circle
          key={el.id}
          cx={el.x}
          cy={el.y}
          r={el.size}
          fill={el.color}
          opacity={el.opacity}
        />
      ))}
    </svg>
  );
}

export default BackgroundAnimation;