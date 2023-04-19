export interface User {
  /**
   * 电子邮件
   */
  email: string;
  /**
   * 授权门面
   */
  shops: string[];
  /**
   * 密码
   */
  password: string;
  /**
   * 称呼
   */
  name: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 备用邮箱
   */
  backup_email?: string;
  /**
   * 累计会话次数
   */
  sessions?: number;
  /**
   * 最近一次登录
   */
  history?: UserHistory;
  /**
   * 状态
   */
  status: boolean;
}

export interface UserHistory {
  timestamp: Date;
  client_ip: string;
  country: string;
  province: string;
  city: string;
  isp: string;
}

export interface SetUserDto {
  $set: 'email' | 'name' | 'avatar' | 'password' | 'backup_email';
  email?: string;
  name?: string;
  avatar?: string;
  password?: string;
  backup_email?: string;
}
