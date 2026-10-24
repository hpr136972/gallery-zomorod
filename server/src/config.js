'use strict';

function loadConfig(env = process.env) {
  const production = env.NODE_ENV === 'production';
  const cfg = {
    production,
    port: Number(env.PORT || 3000),
    dbFile: env.DB_FILE || 'zomorod.db',
    // حالت آزمایشی: همه سفارش‌ها و قیمت‌ها با برچسب isDemo ثبت می‌شوند.
    demoMode: env.DEMO_MODE ? env.DEMO_MODE === '1' : !production,
    // dev: کد پیامک در پاسخ API برگردانده می‌شود (فقط توسعه). provider: ارسال واقعی با آداپتور. off: غیرفعال.
    smsMode: env.SMS_MODE || (production ? 'off' : 'dev'),
    gatewaySecret: env.GATEWAY_SECRET || '',
    pepper: env.PEPPER || (production ? '' : 'dev-pepper-change-me'),
    adminUser: env.ADMIN_USER || 'admin',
    adminPassword: env.ADMIN_PASSWORD || '',
    priceMaxAgeMin: Number(env.PRICE_MAX_AGE_MIN || 720),
    trustProxy: env.TRUST_PROXY === '1',
  };
  if (production) {
    if (!cfg.pepper || cfg.pepper.length < 16) throw new Error('PEPPER (حداقل ۱۶ نویسه) در حالت production الزامی است.');
    if (cfg.adminPassword && cfg.adminPassword.length < 12) throw new Error('ADMIN_PASSWORD باید حداقل ۱۲ نویسه باشد.');
    if (cfg.demoMode) throw new Error('DEMO_MODE=1 در production مجاز نیست.');
  }
  return cfg;
}

module.exports = { loadConfig };
