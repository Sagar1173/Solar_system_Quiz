"use client"
import React, { useState, useEffect } from 'react';

const NewTypingMessage = ({ message }) => {
  const [displayedMessage, setDisplayedMessage] = useState('');

  useEffect(() => {
    let timeout;

    const animateTyping = (index) => {
      if (index <= message.length) {
        setDisplayedMessage(message.slice(0, index));
        timeout = setTimeout(() => animateTyping(index + 1), 50);
      }
    };

    animateTyping(0);

    return () => clearTimeout(timeout);
  }, [message]);

  return <div>{displayedMessage}</div>;
};

export default NewTypingMessage;
