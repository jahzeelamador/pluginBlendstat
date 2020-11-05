# Blendstat Panel by Softtek

The Blendstat Panel is a third-party [Grafana](https://grafana.com/) visualization panel. It is nearly identical to the native [Singlestat](http://docs.grafana.org/features/panels/singlestat/), except it allows for multiple series or queries.

Values from different queries are combined (blended) into single series based on a user-selected function (e.g., `Average`, `Total`, etc) prior to the value for the panel being calculated. Values are blended when they share a timestamp.

## Requierements
- nodejs v12
- npm
- yarn
- grunt and grunt cli
 
## How to use
1. Move to "/var/lib/grafana/plugins".
```sh
cd /var/lib/grafana/plugins
``` 
2.  Clone this repository.
```sh
git clone https://gitlab.digitalcoedevops.com/labs/grafana-plugins/pluginBlendstat
``` 
3. Move to the plugin directory.
```sh
cd pluginBlendstat
```
4. Install dependencies.
```sh
yarn install
```
5. Build plugin.
```
grunt --force
```
6. Restart grafana.
```sh
sudo systemctl restart grafana-server
```
## Learn more
- [Build a panel plugin tutorial](https://grafana.com/tutorials/build-a-panel-plugin)
- [Grafana documentation](https://grafana.com/docs/)

- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana

- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System

