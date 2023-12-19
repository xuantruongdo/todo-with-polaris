import { useState, useEffect } from "react";

const useFetchData = (apiCall) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await apiCall();
      if (res && res.data) {
        setData(res.data.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return { data, loading, error, fetchData };
};

export default useFetchData;
