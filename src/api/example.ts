import request from '@/utils/request/index.ts';

// 获取公告
const requestAnnouncement = () => request({
  url: 'notice',
  method: 'get',
});

export default requestAnnouncement;
