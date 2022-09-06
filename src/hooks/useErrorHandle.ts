import useAnnounce from "./useAnnounce";

export default function useErrorHandle (...fns: ((...args: any) => Promise<void>)[]) {
  const announce = useAnnounce();
  const result = [] as typeof fns;
  fns.forEach((fn) => {
    result.push(async function (...args) {
      try {
        await fn(...args);
      } catch (e: any) {
        announce(e.message);
      }
    });
  });
  return [...result] as const;
}
