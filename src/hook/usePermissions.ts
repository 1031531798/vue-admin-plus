import { buttonPermissions } from "@/utils/permission";
import { useRoute } from "vue-router";

// 按钮权限hook
export function usePermissions() {
  const path = useRoute().path;
  const modeList = ["add", "update", "delete", "audit"];
  const permissionStatus: KeyRecordable<boolean> = {};
  modeList.forEach((mode) => {
    permissionStatus[mode] = buttonPermissions({
      url: path,
      mode,
    });
  });

  return [
    permissionStatus
  ]
}
