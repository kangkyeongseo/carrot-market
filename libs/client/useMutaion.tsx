import { useState } from "react";

interface IUseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

interface IUseState {
  loading: boolean;
  data?: undefined | any;
  error?: undefined | any;
}

export default function useMutation(
  url: string
): [(data: any) => void, IUseMutationState] {
  const [state, setState] = useState<IUseState>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const { loading, data, error } = state;
  function mutation(data: any) {
    setState({ ...state, loading: true });
    fetch(url, {
      method: "POST",
      headers: {
        "Contnet-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((json) => setState({ ...state, data: json }))
      .catch((error) => setState({ ...state, error }))
      .finally(() => setState({ ...state, loading: false }));
  }
  return [mutation, { loading, data, error }];
}
