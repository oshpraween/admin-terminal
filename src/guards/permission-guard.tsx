import React from 'react';

interface PermissionGuardProps {
  requiredPermission: string;
  isPermissionExists?: boolean;
  children: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  requiredPermission,
  isPermissionExists = true,
  children,
}) => {
  // TODO: Enable this after Redux implementation is added
  // const { permissions } = useSelector((state: RootState) => state.authSlice);

  // TODO: Remove this temporary permissions array after Redux implementation
  const permissions: string[] = [];

  if (
    !permissions.some((permission: string) =>
      permission?.startsWith(requiredPermission)
    )
  ) {
    return isPermissionExists ? null : <>{children}</>;
  }

  return isPermissionExists ? <>{children}</> : null;
};

export default PermissionGuard;
