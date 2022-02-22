#!/bin/bash

BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../

PROTO_DEST=./src/proto

mkdir -p ${PROTO_DEST}

npx protoc-gen-grpc --js_out=import_style=commonjs,binary:${PROTO_DEST} --grpc_out=${PROTO_DEST} --proto_path proto proto/*.proto
#npx protoc-gen-grpc-ts --ts_out=service=grpc-node,mode=grpc-js:${PROTO_DEST} --proto_path proto proto/*.proto
npx protoc-gen-grpc-ts --ts_out=service=true:${PROTO_DEST} --proto_path proto proto/*.proto
