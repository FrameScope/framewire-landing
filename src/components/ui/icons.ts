/* Explicit lucide-react imports → tree-shakeable. Maps the kebab-case names used
   throughout the site to their components. Pinned to lucide 0.460.x. */
import type { LucideIcon } from "lucide-react";
import {
  Rss, Database, ShieldCheck, Lightbulb, Menu, X, Unlink, Search, WandSparkles,
  GitBranch, Scale, FileText, History, Globe, Code2, Waypoints, Plug, Upload,
  ScanText, FolderOpen, Key, GitMerge, Check, Building2, TriangleAlert, Eye,
  HelpCircle, TrendingUp, Activity, Network, MapPin, Clock, Split, GitFork,
  FileCheck, Layers, Minus, Plus, Radio, Download, CopyMinus, CalendarCheck,
  Info, Mail, Lock, Link, Archive, Newspaper, Microscope, HeartHandshake,
  Landmark, Shield, Vote, FileSearch, Globe2, Bell, MessageSquare, ArrowRight,
  Ban, MessageSquareText, BookOpen, FolderSearch, ClipboardCheck, MessagesSquare,
  Users, Languages, Heart, BadgeCheck, Map, ListPlus, LayoutList, GitCompare,
  UserCheck, Layers3, Workflow,
  ChevronLeft, ChevronRight, RotateCcw, Play, Pause, PenLine,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  "rss": Rss, "database": Database, "shield-check": ShieldCheck, "lightbulb": Lightbulb,
  "menu": Menu, "x": X, "unlink": Unlink, "search": Search, "wand-sparkles": WandSparkles,
  "git-branch": GitBranch, "scale": Scale, "file-text": FileText, "history": History,
  "globe": Globe, "code-2": Code2, "waypoints": Waypoints, "plug": Plug, "upload": Upload,
  "scan-text": ScanText, "folder-open": FolderOpen, "key": Key, "git-merge": GitMerge,
  "check": Check, "building-2": Building2, "triangle-alert": TriangleAlert, "eye": Eye,
  "help-circle": HelpCircle, "trending-up": TrendingUp, "activity": Activity,
  "network": Network, "map-pin": MapPin, "clock": Clock, "split": Split, "git-fork": GitFork,
  "file-check": FileCheck, "layers": Layers, "minus": Minus, "plus": Plus, "radio": Radio,
  "download": Download, "copy-minus": CopyMinus, "calendar-check": CalendarCheck,
  "info": Info, "mail": Mail, "lock": Lock, "link": Link, "archive": Archive,
  "newspaper": Newspaper, "microscope": Microscope, "heart-handshake": HeartHandshake,
  "landmark": Landmark, "shield": Shield, "vote": Vote, "file-search": FileSearch,
  "globe-2": Globe2, "bell": Bell, "message-square": MessageSquare, "arrow-right": ArrowRight,
  "ban": Ban, "message-square-text": MessageSquareText, "book-open": BookOpen,
  "folder-search": FolderSearch, "clipboard-check": ClipboardCheck,
  "messages-square": MessagesSquare, "users": Users, "languages": Languages,
  "heart": Heart, "badge-check": BadgeCheck, "map": Map, "list-plus": ListPlus,
  "layout-list": LayoutList, "git-compare": GitCompare, "user-check": UserCheck,
  "layers-3": Layers3, "workflow": Workflow,
  "chevron-left": ChevronLeft, "chevron-right": ChevronRight, "rotate-ccw": RotateCcw,
  "play": Play, "pause": Pause, "pen-line": PenLine,
};
