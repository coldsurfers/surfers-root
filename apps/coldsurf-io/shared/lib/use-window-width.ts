// useWindowWidth.ts
import { useSyncExternalStore } from 'react';

type Listener = () => void;

let width = typeof window !== 'undefined' ? window.innerWidth : 0;

const listeners = new Set<Listener>();

// rAF 기반의 가벼운 스로틀
let ticking = false;
function emit() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const next = window.innerWidth;
    if (next !== width) {
      width = next;
      listeners.forEach((l) => l());
    }
  });
}

// 브라우저 환경에서만 1회 바인딩
if (typeof window !== 'undefined') {
  window.addEventListener('resize', emit);
  // 필요시 방향 전환도 반영하려면 주석 해제
  // window.addEventListener('orientationchange', emit);
}

/**
 * 현재 윈도우 width를 외부 스토어처럼 구독합니다.
 * @param initialWidth SSR에서 사용할 초기값 (기본 0)
 */
export function useWindowWidth(initialWidth = 0) {
  return useSyncExternalStore(
    // subscribe
    (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    // getSnapshot (클라이언트)
    () => width,
    // getServerSnapshot (SSR)
    () => initialWidth
  );
}
