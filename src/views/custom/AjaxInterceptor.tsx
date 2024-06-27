import { useEffect } from 'react';
import fetchIntercept from 'fetch-intercept';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AjaxInterceptor = () => {    
    useEffect(() => {
        const unregister = fetchIntercept.register({ 
            request: function (url: string, config: any) {
                let urlObject = url as any;
                if (!( String(url).startsWith(API_URL as string) || String(urlObject?.href).startsWith(API_URL as string) )) {
                    return [url, config];
                }   

                if (!config) {
                    config = {};
                }
                // Disabled after using jwt...
                // Session is not compatible with Google Add on integration.
                // if (!config["credentials"]) {
                //     // This is essential !
                //     // Sending Credentials with a Fetch Request
                //     // We can persist cookie id with this option.
                //     // So we can be connected as session in server side...
                //     // https://web.dev/introduction-to-fetch/#sending-credentials-with-a-fetch-request
                //     config["credentials"] = 'include';
                // }
                if (!config.headers) {
                    config.headers = {};
                }
                if (!config.headers["X-Requested-With"]) {
                  // This flag does not include automatically, if you use 'fetch'
                  // It is added automatically only if you use jQuery Ajax.
                  // If this header is absent, req.xhr is not set on node.js server side.
                  config.headers["X-Requested-With"] = "XMLHttpRequest";
                }
                if (!config.headers["Content-Type"]) {
                    config.headers["Content-Type"] = 'application/json';
                }
                if (!config.headers["x-authorization"] && typeof window !== 'undefined') {
                    // jwt_token
                    // let jwt_token = window?.localStorage?.getItem('jwtToken');
                    // if ( jwt_token ) jwt_token = jwt_token?.replace(/"/g, '');
                    // config.headers["x-authorization"] = jwt_token;
                }
                return [url, config];
            },
            response: function (response) {
                // Modify the reponse object 
                // BEGIN AJAX_AUTH_CHECK
                // if (
                //   typeof window !== 'undefined' && 
                //   response.status === 401 && 
                //   !window.location.pathname.includes('auth')
                // ) { 
                //   alert("Your request is unauthorized! Please login (again).");
                //   window.location.href = `/pages/login?redirectUri=${encodeURIComponent(window.location.href)}`;
                // }
                // END AJAX_AUTH_CHECK
                return response;
            },
            responseError: function (error: any) {
                console.log('Error on AJAX fetch')
                console.error(error)
                // Handle an fetch error
                return Promise.reject(error);
            },
        });

        return () => { unregister() };
    }, []);

    return (<></>);
};

export default AjaxInterceptor;
