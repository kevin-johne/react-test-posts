import React from "react";

export function useFetch<Data>(url: string) {
  const [data, setData] = React.useState<Data | null>(null);
  const [error, setError] = React.useState<unknown | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setError(null);
      try {
        setIsLoading(true);
        const response = await fetch(url, { signal: controller.signal });
        const user = await response.json();
        setIsLoading(false);
        setData(user);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();

    return () => {
      if (controller.signal.aborted) return;
      controller.abort();
      setIsLoading(false);
    };
  }, [url]);

  return { data, error, isLoading };
}
