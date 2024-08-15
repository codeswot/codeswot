import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class LocalImage extends StatelessWidget {
  const LocalImage({
    required this.imgPath,
    this.height,
    this.width,
    this.color,
    this.fit = BoxFit.contain,
    this.borderRadius,
    this.alignmentDirectional,
    this.matchTextDirection,
    super.key,
  });

  final String imgPath;
  final double? height;
  final double? width;
  final BoxFit fit;
  final Color? color;
  final BorderRadiusGeometry? borderRadius;
  final AlignmentDirectional? alignmentDirectional;
  final bool? matchTextDirection;

  @override
  Widget build(BuildContext context) => ClipRRect(
        borderRadius: borderRadius ?? BorderRadius.circular(0),
        child: (imgPath.contains('.svg'))
            ? SvgPicture.asset(
                imgPath,
                width: width,
                height: height,
                fit: fit,
                colorFilter: color == null ? null : ColorFilter.mode(color!, BlendMode.srcIn),
                matchTextDirection: matchTextDirection ?? false,
                alignment: alignmentDirectional ?? Alignment.center,
              )
            : Image.asset(
                imgPath,
                width: width,
                height: height,
                fit: fit,
                color: color,
                matchTextDirection: matchTextDirection ?? false,
                alignment: alignmentDirectional ?? Alignment.center,
              ),
      );
}
