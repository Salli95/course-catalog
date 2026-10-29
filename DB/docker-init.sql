-- docker-init.sql
-- Инициализация роли catalog_app и вспомогательных баз данных для Лабораторной 6

-- 1. Создание роли приложения catalog_app с паролем change-me
DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'catalog_app') THEN
      CREATE ROLE catalog_app WITH LOGIN PASSWORD 'change-me' SUPERUSER;
   END IF;
END
$do$;

-- 2. Создание тестовых баз для экспериментов Лабораторной 6 (шаги 6 и bonus)
SELECT 'CREATE DATABASE idx_demo OWNER catalog_app'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'idx_demo')\gexec

SELECT 'CREATE DATABASE norm_demo OWNER catalog_app'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'norm_demo')\gexec

