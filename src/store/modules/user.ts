import { defineStore } from "pinia";
import { UserStoreType } from "@/store/types";
import { getStorage, setStorage } from "@/utils/storage";
import { TOKEN_KEY, USERINFO_KEY } from "@/enum/cacheEnum";
import { UserLoginProps } from "@/layout/login/types";
import { getUserInfoByToken, loginUser, logoutUser } from "@/api/login";
import { AesEncryption } from "@/utils/encryption";
import router from "@/router";
import { PageEnum } from "@/enum/pageEnum";

export const useUserStore = defineStore({
  id: "user-store",
  state: ():UserStoreType  => ({
    userInfo: {},
    dictAll: {},
    token: getStorage({key: TOKEN_KEY}) || ""
  }),
  getters: {
    getToken(state): string {
      return state.token;
    },
  },
  actions: {
    loginAction (userData: UserLoginProps) {
      const aes = new AesEncryption({
        key: 'aochendemo@12345'
      })
      const data = {
        ...userData,
        password: aes.encryptByAES(userData.password, true)
      }
      return loginUser(data).then(({user_info, access_token}) => {
        this.setToken(access_token)
        this.userInfo = user_info
      })
    },
    logOut() {
      logoutUser().then(() => {
        sessionStorage.removeItem(TOKEN_KEY)
        sessionStorage.removeItem(USERINFO_KEY)
        router.replace(PageEnum.BASE_LOGIN);
      })
    },
    setUserInfo () {
      getUserInfoByToken().then(({data}) => {
        this.userInfo = data.userInfo
      })
    },
    setToken(token: string) {
      this.token = token;
      setStorage({
        key: TOKEN_KEY,
        value: token,
      })
    },
  }
});
