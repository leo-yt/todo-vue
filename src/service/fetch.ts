import axios from 'axios';

const fetch = async (url: string, options: any = {}) => {
  const {
    method = 'GET',
    headers = {},
    data = {},
    timeout = 10000,
    withCredentials = false,
    responseType = 'json',
  } = options;

	const user_id = localStorage.getItem('user_id');

  const response = await axios({
    method,
    url,
	  data: {
			...data,
		  user_id
	  },
	  params: {
			...data,
		  user_id
	  },
    headers,
    timeout,
    withCredentials,
    responseType,
  });
	return response.data;
}

export default fetch;
