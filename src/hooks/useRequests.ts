import React from "react";

export function useFetch<Data>(url: string) {
  const [data, setData] = React.useState<Data | null>(null);
  const [isError, setIsError] = React.useState<unknown | null>(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsError(null);
      setIsLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
        const user = await response.json();
        setIsLoading(false);
        setData(user);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.log(error);
        setIsError(error);
      }
    };
    fetchData();

    return () => {
      if (controller.signal.aborted) return;
      controller.abort();
      setIsLoading(false);
    };
  }, [url]);

  return { data, isError, isLoading };
}
