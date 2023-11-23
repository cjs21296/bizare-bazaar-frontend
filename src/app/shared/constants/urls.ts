const BASE_URL = 'http://localhost:5000';

export const ITEMS_URL = BASE_URL+'/api/items';
export const ITEM_BY_SEARCH_URL = ITEMS_URL+'/search/';
export const ITEM_BY_ID = ITEMS_URL+'/';

export const USER_LOGIN_URL = BASE_URL+'/api/users/login';
export const USER_REGISTER_URL = BASE_URL+'/api/users/register';

export const ORDER_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDER_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDER_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDER_URL + '/pay';
export const ORDER_TRACK_URL = ORDER_URL + '/track/';
export const TRACK_ALL_ORDERS_CURRENT_USER_URL = ORDER_URL + '/allOrdersForCurrentUser';
