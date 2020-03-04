import React from 'react';
import './windowSplitter.css';

const windowSplitterContext = React.createContext();

// Window splitter controller component
function WindowSplitter({ children, className, ...props }) {
  const [LeftWidth, setLeftWidth] = React.useState(null);
  const separatorXPosition = React.useRef(null);

  const windowSplitterRef = React.createRef();

  const onMouseUp = () => {
    separatorXPosition.current = null;
  };

  const onMouseDown = e => {
    separatorXPosition.current = e.clientX;
  };

  const onMouseMove = e => {
    if (!separatorXPosition.current) {
      return;
    }

    const newLeftWidth = LeftWidth + e.clientX - separatorXPosition.current;
    separatorXPosition.current = e.clientX;

    // Check if the new width less than the container
    if (newLeftWidth <= 0) {
      return LeftWidth !== 0 && setLeftWidth(0);
    }

    const windowSplitterWidth = windowSplitterRef.current.clientWidth;

    // Check if the new width is more than the container
    if (newLeftWidth >= windowSplitterWidth) {
      return newLeftWidth !== windowSplitterWidth && setLeftWidth(windowSplitterWidth);
    }

    setLeftWidth(newLeftWidth);
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  });

  return (
    <div {...props} className={`window-splitter ${className}`} ref={windowSplitterRef}>
      <windowSplitterContext.Provider value={{ LeftWidth, setLeftWidth }}>
        {children[0]}
        <div className='separator' onMouseDown={onMouseDown} />
        {children[1]}
      </windowSplitterContext.Provider>
    </div>
  );
}

// Left Window
WindowSplitter.Left = function WindowSplitterLeft(props) {
  const topRef = React.createRef();
  const { LeftWidth, setLeftWidth } = React.useContext(windowSplitterContext);

  React.useEffect(() => {
    if (!LeftWidth) {
      setLeftWidth(topRef.current.clientWidth);
      topRef.current.style.flex = 'none';
    } else {
      topRef.current.style.width = `${LeftWidth}px`;
    }
  }, [LeftWidth]);

  return <div {...props} className='window-splitter-left' ref={topRef} />;
};

// Right Window
WindowSplitter.Right = function WindowSplitterRight(props) {
  return <div {...props} className='window-splitter-right' />;
};

export default WindowSplitter;