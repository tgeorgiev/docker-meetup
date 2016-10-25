# Overview

Super simple 2 service application to demonstrate Docker networking features such as: user defined network with bridge and overlay drivers, DNS and DNS RR and 1.12 VIP LB in swarm mode.

## Building Images
```shell
docker build -t tgeorgiev/hello-service -f Dockerfile.hello .
docker build -t tgeorgiev/hello-front-service -f Dockerfile.front .
```

## Creating user defined network
```shell
docker network create hello-net
```

## Creating user defined network with overlay driver
```shell
docker network create hello-net -d overlay
```

# Standalone mode (with DNS RR LB)
## Running multiple instances of backend service by attaching to network
```shell
docker run -d --network=hello-net --network-alias=hello-service tgeorgiev/hello-service
docker run -d --network=hello-net --network-alias=hello-service tgeorgiev/hello-service
docker run -d --network=hello-net --network-alias=hello-service tgeorgiev/hello-service
...
```

## Running frontend service and attach to network
```shell
docker run -d -P --network=hello-net tgeorgiev/hello-front-service
```

# Swarm mode (with VIP LB)
## Running multiple instances of backend service by attaching to network
```shell
docker service create --network=hello-net --name=hello-service --replicas 3  tgeorgiev/hello-service
```
## Running frontend service and attach to network
```shell
docker service create --network=hello-net -p :80 tgeorgiev/hello-front-service
```