import { useEffect, useState } from 'react';

interface useIntersectionObserverProps {
  root?: HTMLDivElement | null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({
  rootMargin,
  threshold,
  onIntersect,
}: Omit<useIntersectionObserverProps, 'root'>) => {
  const [target, setTarget] = useState<HTMLElement | null>(null); // 스크롤 감시 target ref
  const [root, setRoot] = useState<HTMLElement | null>(null); // 스크롤 container ref

  useEffect(() => {
    if (!target || !root) return;

    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, root]);

  return { setTarget, setRoot };
};
export default useIntersectionObserver;
