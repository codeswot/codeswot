import 'package:codeswot/main/widget/app_bar.dart';
import 'package:codeswot/main/widget/awesome_logo.dart';
import 'package:codeswot/main/widget/corners/email.dart';
import 'package:codeswot/main/widget/corners/live_chat.dart';
import 'package:codeswot/main/widget/corners/social.dart';
import 'package:codeswot/main/widget/main_desktop.dart';
import 'package:codeswot/main/widget/under_construction.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:responsive_framework/responsive_framework.dart';

class HomeMain extends ConsumerStatefulWidget {
  const HomeMain({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomeMainState();
}

class _HomeMainState extends ConsumerState<HomeMain> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final isDesktopAbove = ResponsiveBreakpoints.of(context).largerThan(TABLET);
    return Scaffold(
        backgroundColor: const Color(0xff0A192F),
        appBar: isDesktopAbove ? const CodeswotAppBar() : null,
        body: isDesktopAbove
            ? const Stack(
                children: [
                  MainPageLgMd(),
                  EmailLgMd(),
                  BottomAnchorStyleLgMd(),
                  BottomSocialLgMd(),
                ],
              )
            : const Undercontruction(),
        floatingActionButton: FloatingActionButton(
          backgroundColor: const Color(0xff353353),
          foregroundColor: Colors.white,
          onPressed: () {},
          child: const Icon(Icons.chat_bubble_outline),
        ));
  }
}
