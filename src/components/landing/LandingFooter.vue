<template>
  <footer class="landing-footer">
    <div class="footer-content">
      <div class="footer-brand">
        <div class="brand-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#00D6B9"/>
            <path d="M2 17L12 22L22 17" stroke="#00D6B9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#00D6B9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="brand-name">DevOps Claw</span>
        </div>
      </div>
      
      <nav class="footer-nav">
        <a v-for="link in navLinks" :key="link.text" :href="link.href" class="nav-link">
          {{ link.text }}
        </a>
      </nav>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">Copyright © 2026 DevOps Claw Team. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const navLinks = [
  { text: '文档', href: '/html/prd.html' },
  { text: 'API', href: '#' },
  { text: '社区', href: 'https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=f52t3159-244b-45e5-b687-05239c7db526' },
  { text: '状态页', href: '#' },
  { text: '更新日志', href: '#' },
]
</script>

<style lang="less" scoped>
.landing-footer {
  background-color: #1a1a1a;
  color: rgba(255, 255, 255, 0.65);
  padding: 40px 24px 24px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  .brand-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .brand-name {
      font-size: 16px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

.footer-nav {
  display: flex;
  gap: 32px;
  
  .nav-link {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.copyright {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.6;
}

// 响应式适配
@media (max-width: 1024px) {
  .landing-footer {
    padding: 32px 20px 20px;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;
  }
  
  .footer-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px 24px;
  }
  
  .copyright {
    font-size: 11px;
  }
}
</style>
