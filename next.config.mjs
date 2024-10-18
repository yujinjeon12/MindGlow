/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['mindglow-bucket.s3.ap-northeast-2.amazonaws.com'], // S3 도메인 추가
    },
};

export default nextConfig;
