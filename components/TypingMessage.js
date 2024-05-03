import { useEffect, useState } from 'react';

const TypingMessage = ({ message }) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < message.length) {
      const interval = setInterval(() => {
        setDisplayedMessage(prevMessage => prevMessage + message[index]);
        setIndex(prevIndex => prevIndex + 1);
        if (index === message.length - 1) {
          clearInterval(interval);
        }
      }, 30); 

      return () => clearInterval(interval); // Cleanup function to clear the interval
    }
  }, [index, message]);

  return (
    <div className=' text-sm  width-intro-voyager  font-medium  mb-10 sm:text-2xl sm:leading-10'>
      <p className='self-center'>{displayedMessage}</p>
    </div>
  );
};

export default TypingMessage;