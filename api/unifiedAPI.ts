import communityApi from "./communityApi";
import getUserApi from "./getUser";

/**
 * 다양한 api를 통합해 한번에 사용하기
 */
const unifiedAPI = {
  getUserApi,
  communityApi,
};

export default unifiedAPI;
