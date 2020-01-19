cd backend/
npm t
docker build -t moritzploss/polychat-backend .
cd ..

cd client/
yarn run build
docker build -t moritzploss/polychat-client .
cd ..
