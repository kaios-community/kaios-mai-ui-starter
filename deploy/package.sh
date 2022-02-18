VERSION=$1

echo "Packaging version ${VERSION}"

cd dist-v2 && zip -r ../kaios-mai-ui-starter_v${VERSION}-kaios2.zip * && cd ..
cd dist-v3 && zip -r ../kaios-mai-ui-starter_v${VERSION}-kaios3.zip * && cd ..