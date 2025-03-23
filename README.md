# Liferay Generator

Create liferay `workspaces, portlets and themes` using this `Liferay cli tool`, it will work with all the versions of `Yeoman` and meant to be easy to use.

It can greatly improve the productivity of a liferay developer who is looking for light weight command line tool to scaffold the liferay projects quickly and easily.

## Installation

```bash
npm install -g yo generator-liferay
```

## Generating new liferay workspace

```bash
yo liferay:workspace [name] [version]

# e.g
yo liferay:workspace my-workspace dxp-2024.q4.7
```

## Generating new liferay portlet project

```bash
yo liferay:portlet [project-name] [PortletName] [package.name]

# e.g
yo liferay:portlet my-project MyPortlet com.abc
```

## Generating new liferay theme

```bash
yo liferay:theme [theme-name] [server/path] [0/1:FontAwesome]

0: Not add fontAwesome
1: Add fontAwesome

# e.g
yo liferay:theme my-awesome-theme my/server/path 1
```

## License

© [Maratib Ali Khan](https://maratib.github.io)
