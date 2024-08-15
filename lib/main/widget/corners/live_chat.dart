import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/svg.dart';

class BottomAnchorStyleLgMd extends StatelessWidget {
  const BottomAnchorStyleLgMd({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 0,
      right: 0,
      child: SvgPicture.asset(
        'icons/svg/bottom_arrow.svg',
        width: 140.w,
        color: const Color(0xff64FFDA).withOpacity(0.4),
      ),
    );
  }
}
