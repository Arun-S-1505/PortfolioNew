import React, { useEffect, useState } from "react";

interface TypingEffectProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ texts, speed = 120, deleteSpeed = 80, pauseDuration = 2000 }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % texts.length;
      const fullText = texts[current];
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? deleteSpeed : speed);
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, texts, speed, deleteSpeed, pauseDuration]);

  return (
    <span>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypingEffect;
