# 在 Milk-V Pioneer 上安装基于UEFI启动流程的 openEuler 24.03

Pioneer 出厂时 NOR Flash 固件没有支持基于 EDK2 的 UEFI 启动流程，因此需要首先部署 EDK2 固件。之后则可以使用 openEuler 官方发布的ISO安装镜像执行系统安装。

鉴于 Pioneer 的主控 SG2042 会优先从 SD 卡加载固件，因此本文档基于：

- 在 microSD 卡上部署 UEFI 固件
- 将 ISO 安装镜像烧录至U盘
- 系统安装至 M.2 NVMe 硬盘上

的思路来部署 openEuler RISC-V。

## 固件安装

下载 `sg2042_firmware_uefi.img.zip`