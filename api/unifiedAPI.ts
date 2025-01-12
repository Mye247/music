import communityApi from "./communityApi";
import getUserApi from "./getUser";
import profileApi from "./profileApi";
import storeApi from "./storeApi";

/**
 * 다양한 api를 통합해 한번에 쉽게 사용하기
 */
const unifiedAPI = {
  getUserApi,
  communityApi,
  profileApi,
  storeApi,
};

export default unifiedAPI;
