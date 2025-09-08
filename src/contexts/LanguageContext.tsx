import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.allNodes': 'All Nodes',
    'nav.nilDB': 'nilDB',
    'nav.nilAI': 'nilAI',
    'nav.validators': 'Validators',
    'nav.ecosystem': 'Ecosystem',
    
    // Dashboard
    'dashboard.subtitle': 'Neque amet lacus orci turpis enim.',
    'dashboard.searchPlaceholder': 'Search for nodes, locations, operators...',
    
    // Table Headers
    'table.nodeName': 'Name',
    'table.liveSince': 'Live Since',
    'table.location': 'Location',
    'table.cloud': 'Cloud',
    'table.type': 'Type',
    
    // Search
    'search.noResults': 'No nodes found matching',
    
    // Metrics
    'metrics.secretsStored': 'Secrets stored',
    'metrics.totalSecretSize': 'Total Secret Size',
    'metrics.collectionsCreated': 'Collections Created',
    'metrics.totalValueLocked': 'Total Value Locked',
    'metrics.volume24h': '24h Volume',
    'metrics.activeUsers': 'Active Users',
    
    // Ecosystem Page
    'ecosystem.title': 'Ecosystem Dashboard',
    'ecosystem.description': 'Welcome to the Nillion Ecosystem! This is where you can explore all the amazing projects, applications, and services built on the Nillion network. From DeFi protocols to gaming platforms, discover the innovative solutions leveraging private computation.',
    'ecosystem.defi.title': 'DeFi Projects',
    'ecosystem.defi.description': 'Private trading, lending, and financial services',
    'ecosystem.gaming.title': 'Gaming & NFTs',
    'ecosystem.gaming.description': 'Private gaming experiences and hidden NFT ownership',
    'ecosystem.infrastructure.title': 'Infrastructure',
    'ecosystem.infrastructure.description': 'Tools and services for private computation',
    'ecosystem.comingSoon.title': 'Coming Soon',
    'ecosystem.comingSoon.description': 'We\'re building an amazing ecosystem dashboard that will showcase all projects, provide detailed analytics, and offer insights into the growing Nillion ecosystem. Stay tuned for updates!',
    
    // Project Details
    'project.about': 'About',
    'project.activityOverview': 'Activity Overview',
    'project.activityChartPlaceholder': 'Activity Chart Placeholder',
    
    // Status
    'status.live': 'Live',
    'status.beta': 'Beta',
    
    // Categories
    'category.defi': 'DeFi',
    'category.infrastructure': 'Infrastructure',
    'category.gaming': 'Gaming',
    'category.social': 'Social',
    'category.nft': 'NFT',
    'category.validator': 'Validator',
    'category.dapp': 'DApp',
    
    // Time periods
    'time.7d': '7D',
    'time.30d': '30D',
    'time.all': 'ALL',
    
    // Locations
    'location.london': 'London, UK',
    'location.newYork': 'New York, US',
    'location.tokyo': 'Tokyo, JP',
    'location.frankfurt': 'Frankfurt, DE',
    'location.singapore': 'Singapore, SG',
    'location.sydney': 'Sydney, AU',
    'location.toronto': 'Toronto, CA',
    'location.mumbai': 'Mumbai, IN',
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.allNodes': 'Tous les Nœuds',
    'nav.nilDB': 'nilDB',
    'nav.nilAI': 'nilAI',
    'nav.validators': 'Validateurs',
    'nav.ecosystem': 'Écosystème',
    
    // Dashboard
    'dashboard.subtitle': 'Neque amet lacus orci turpis enim.',
    'dashboard.searchPlaceholder': 'Rechercher des nœuds, emplacements, opérateurs...',
    
    // Table Headers
    'table.nodeId': 'ID du Nœud',
    'table.location': 'Emplacement',
    'table.operator': 'Opérateur',
    'table.type': 'Type',
    
    // Search
    'search.noResults': 'Aucun nœud trouvé correspondant à',
    
    // Metrics
    'metrics.secretsStored': 'Secrets stockés',
    'metrics.totalSecretSize': 'Taille totale des secrets',
    'metrics.collectionsCreated': 'Collections créées',
    'metrics.totalValueLocked': 'Valeur totale verrouillée',
    'metrics.volume24h': 'Volume 24h',
    'metrics.activeUsers': 'Utilisateurs actifs',
    
    // Ecosystem Page
    'ecosystem.title': 'Tableau de Bord de l\'Écosystème',
    'ecosystem.description': 'Bienvenue dans l\'Écosystème Nillion ! C\'est ici que vous pouvez explorer tous les projets, applications et services incroyables construits sur le réseau Nillion. Des protocoles DeFi aux plateformes de jeux, découvrez les solutions innovantes exploitant le calcul privé.',
    'ecosystem.defi.title': 'Projets DeFi',
    'ecosystem.defi.description': 'Trading privé, prêts et services financiers',
    'ecosystem.gaming.title': 'Jeux et NFTs',
    'ecosystem.gaming.description': 'Expériences de jeu privées et propriété NFT cachée',
    'ecosystem.infrastructure.title': 'Infrastructure',
    'ecosystem.infrastructure.description': 'Outils et services pour le calcul privé',
    'ecosystem.comingSoon.title': 'Bientôt Disponible',
    'ecosystem.comingSoon.description': 'Nous construisons un tableau de bord d\'écosystème incroyable qui présentera tous les projets, fournira des analyses détaillées et offrira des informations sur l\'écosystème Nillion en croissance. Restez à l\'écoute pour les mises à jour !',
    
    // Project Details
    'project.about': 'À Propos',
    'project.activityOverview': 'Aperçu de l\'Activité',
    'project.activityChartPlaceholder': 'Espace Réservé au Graphique d\'Activité',
    
    // Status
    'status.live': 'En Direct',
    'status.beta': 'Bêta',
    
    // Categories
    'category.defi': 'DeFi',
    'category.infrastructure': 'Infrastructure',
    'category.gaming': 'Jeux',
    'category.social': 'Social',
    'category.nft': 'NFT',
    'category.validator': 'Validateur',
    'category.dapp': 'DApp',
    
    // Time periods
    'time.7d': '7J',
    'time.30d': '30J',
    'time.all': 'TOUT',
    
    // Locations
    'location.london': 'Londres, Royaume-Uni',
    'location.newYork': 'New York, États-Unis',
    'location.tokyo': 'Tokyo, Japon',
    'location.frankfurt': 'Francfort, Allemagne',
    'location.singapore': 'Singapour, Singapour',
    'location.sydney': 'Sydney, Australie',
    'location.toronto': 'Toronto, Canada',
    'location.mumbai': 'Mumbai, Inde',
  },
  de: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.allNodes': 'Alle Knoten',
    'nav.nilDB': 'nilDB',
    'nav.nilAI': 'nilAI',
    'nav.validators': 'Validatoren',
    'nav.ecosystem': 'Ökosystem',
    
    // Dashboard
    'dashboard.subtitle': 'Neque amet lacus orci turpis enim.',
    'dashboard.searchPlaceholder': 'Suche nach Knoten, Standorten, Betreibern...',
    
    // Table Headers
    'table.nodeId': 'Knoten-ID',
    'table.location': 'Standort',
    'table.operator': 'Betreiber',
    'table.type': 'Typ',
    
    // Search
    'search.noResults': 'Keine Knoten gefunden, die übereinstimmen mit',
    
    // Metrics
    'metrics.secretsStored': 'Gespeicherte Geheimnisse',
    'metrics.totalSecretSize': 'Gesamtgröße der Geheimnisse',
    'metrics.collectionsCreated': 'Erstellte Sammlungen',
    'metrics.totalValueLocked': 'Gesamt gesperrter Wert',
    'metrics.volume24h': '24h Volumen',
    'metrics.activeUsers': 'Aktive Benutzer',
    
    // Ecosystem Page
    'ecosystem.title': 'Ökosystem Dashboard',
    'ecosystem.description': 'Willkommen im Nillion Ökosystem! Hier können Sie alle erstaunlichen Projekte, Anwendungen und Dienste erkunden, die auf dem Nillion-Netzwerk aufgebaut sind. Von DeFi-Protokollen bis hin zu Gaming-Plattformen, entdecken Sie die innovativen Lösungen, die private Berechnungen nutzen.',
    'ecosystem.defi.title': 'DeFi Projekte',
    'ecosystem.defi.description': 'Privater Handel, Kredite und Finanzdienstleistungen',
    'ecosystem.gaming.title': 'Gaming & NFTs',
    'ecosystem.gaming.description': 'Private Gaming-Erfahrungen und versteckter NFT-Besitz',
    'ecosystem.infrastructure.title': 'Infrastruktur',
    'ecosystem.infrastructure.description': 'Tools und Services für private Berechnungen',
    'ecosystem.comingSoon.title': 'Demnächst',
    'ecosystem.comingSoon.description': 'Wir bauen ein erstaunliches Ökosystem-Dashboard, das alle Projekte präsentiert, detaillierte Analysen bietet und Einblicke in das wachsende Nillion-Ökosystem gewährt. Bleiben Sie dran für Updates!',
    
    // Project Details
    'project.about': 'Über',
    'project.activityOverview': 'Aktivitätsübersicht',
    'project.activityChartPlaceholder': 'Aktivitätsdiagramm Platzhalter',
    
    // Status
    'status.live': 'Live',
    'status.beta': 'Beta',
    
    // Categories
    'category.defi': 'DeFi',
    'category.infrastructure': 'Infrastruktur',
    'category.gaming': 'Gaming',
    'category.social': 'Sozial',
    'category.nft': 'NFT',
    'category.validator': 'Validator',
    'category.dapp': 'DApp',
    
    // Time periods
    'time.7d': '7T',
    'time.30d': '30T',
    'time.all': 'ALLE',
    
    // Locations
    'location.london': 'London, Vereinigtes Königreich',
    'location.newYork': 'New York, USA',
    'location.tokyo': 'Tokio, Japan',
    'location.frankfurt': 'Frankfurt, Deutschland',
    'location.singapore': 'Singapur, Singapur',
    'location.sydney': 'Sydney, Australien',
    'location.toronto': 'Toronto, Kanada',
    'location.mumbai': 'Mumbai, Indien',
  },
  ja: {
    // Navigation
    'nav.dashboard': 'ダッシュボード',
    'nav.allNodes': 'すべてのノード',
    'nav.nilDB': 'nilDB',
    'nav.nilAI': 'nilAI',
    'nav.validators': 'バリデーター',
    'nav.ecosystem': 'エコシステム',
    
    // Dashboard
    'dashboard.subtitle': 'Neque amet lacus orci turpis enim.',
    'dashboard.searchPlaceholder': 'ノード、場所、オペレーターを検索...',
    
    // Table Headers
    'table.nodeId': 'ノードID',
    'table.location': '場所',
    'table.operator': 'オペレーター',
    'table.type': 'タイプ',
    
    // Search
    'search.noResults': '一致するノードが見つかりません',
    
    // Metrics
    'metrics.secretsStored': '保存されたシークレット',
    'metrics.totalSecretSize': 'シークレットの総サイズ',
    'metrics.collectionsCreated': '作成されたコレクション',
    'metrics.totalValueLocked': '総ロック価値',
    'metrics.volume24h': '24時間ボリューム',
    'metrics.activeUsers': 'アクティブユーザー',
    
    // Ecosystem Page
    'ecosystem.title': 'エコシステムダッシュボード',
    'ecosystem.description': 'Nillionエコシステムへようこそ！ここでは、Nillionネットワーク上に構築されたすべての素晴らしいプロジェクト、アプリケーション、サービスを探索できます。DeFiプロトコルからゲーミングプラットフォームまで、プライベート計算を活用した革新的なソリューションを発見してください。',
    'ecosystem.defi.title': 'DeFiプロジェクト',
    'ecosystem.defi.description': 'プライベート取引、貸付、金融サービス',
    'ecosystem.gaming.title': 'ゲーミング & NFT',
    'ecosystem.gaming.description': 'プライベートゲーミング体験と隠されたNFT所有権',
    'ecosystem.infrastructure.title': 'インフラストラクチャ',
    'ecosystem.infrastructure.description': 'プライベート計算のためのツールとサービス',
    'ecosystem.comingSoon.title': '近日公開',
    'ecosystem.comingSoon.description': 'すべてのプロジェクトを紹介し、詳細な分析を提供し、成長するNillionエコシステムへの洞察を提供する素晴らしいエコシステムダッシュボードを構築しています。アップデートをお待ちください！',
    
    // Project Details
    'project.about': '概要',
    'project.activityOverview': 'アクティビティ概要',
    'project.activityChartPlaceholder': 'アクティビティチャートプレースホルダー',
    
    // Status
    'status.live': 'ライブ',
    'status.beta': 'ベータ',
    
    // Categories
    'category.defi': 'DeFi',
    'category.infrastructure': 'インフラ',
    'category.gaming': 'ゲーミング',
    'category.social': 'ソーシャル',
    'category.nft': 'NFT',
    'category.validator': 'バリデーター',
    'category.dapp': 'DApp',
    
    // Time periods
    'time.7d': '7日',
    'time.30d': '30日',
    'time.all': 'すべて',
    
    // Locations
    'location.london': 'ロンドン、イギリス',
    'location.newYork': 'ニューヨーク、アメリカ',
    'location.tokyo': '東京、日本',
    'location.frankfurt': 'フランクフルト、ドイツ',
    'location.singapore': 'シンガポール、シンガポール',
    'location.sydney': 'シドニー、オーストラリア',
    'location.toronto': 'トロント、カナダ',
    'location.mumbai': 'ムンバイ、インド',
  },
  zh: {
    // Navigation
    'nav.dashboard': '仪表板',
    'nav.allNodes': '所有节点',
    'nav.nilDB': 'nilDB',
    'nav.nilAI': 'nilAI',
    'nav.validators': '验证器',
    'nav.ecosystem': '生态系统',
    
    // Dashboard
    'dashboard.subtitle': 'Neque amet lacus orci turpis enim.',
    'dashboard.searchPlaceholder': '搜索节点、位置、运营商...',
    
    // Table Headers
    'table.nodeId': '节点ID',
    'table.location': '位置',
    'table.operator': '运营商',
    'table.type': '类型',
    
    // Search
    'search.noResults': '未找到匹配的节点',
    
    // Metrics
    'metrics.secretsStored': '存储的秘密',
    'metrics.totalSecretSize': '秘密总大小',
    'metrics.collectionsCreated': '创建的集合',
    'metrics.totalValueLocked': '总锁定价值',
    'metrics.volume24h': '24小时交易量',
    'metrics.activeUsers': '活跃用户',
    
    // Ecosystem Page
    'ecosystem.title': '生态系统仪表板',
    'ecosystem.description': '欢迎来到Nillion生态系统！在这里您可以探索所有建立在Nillion网络上的令人惊叹的项目、应用程序和服务。从DeFi协议到游戏平台，发现利用私有计算的创新解决方案。',
    'ecosystem.defi.title': 'DeFi项目',
    'ecosystem.defi.description': '私人交易、借贷和金融服务',
    'ecosystem.gaming.title': '游戏和NFT',
    'ecosystem.gaming.description': '私人游戏体验和隐藏的NFT所有权',
    'ecosystem.infrastructure.title': '基础设施',
    'ecosystem.infrastructure.description': '私有计算的工具和服务',
    'ecosystem.comingSoon.title': '即将推出',
    'ecosystem.comingSoon.description': '我们正在构建一个令人惊叹的生态系统仪表板，它将展示所有项目，提供详细的分析，并提供对不断增长的Nillion生态系统的洞察。敬请关注更新！',
    
    // Project Details
    'project.about': '关于',
    'project.activityOverview': '活动概览',
    'project.activityChartPlaceholder': '活动图表占位符',
    
    // Status
    'status.live': '在线',
    'status.beta': '测试版',
    
    // Categories
    'category.defi': 'DeFi',
    'category.infrastructure': '基础设施',
    'category.gaming': '游戏',
    'category.social': '社交',
    'category.nft': 'NFT',
    'category.validator': '验证器',
    'category.dapp': 'DApp',
    
    // Time periods
    'time.7d': '7天',
    'time.30d': '30天',
    'time.all': '全部',
    
    // Locations
    'location.london': '伦敦，英国',
    'location.newYork': '纽约，美国',
    'location.tokyo': '东京，日本',
    'location.frankfurt': '法兰克福，德国',
    'location.singapore': '新加坡，新加坡',
    'location.sydney': '悉尼，澳大利亚',
    'location.toronto': '多伦多，加拿大',
    'location.mumbai': '孟买，印度',
  },
  es: {
    // Navigation
    'nav.dashboard': 'Panel de Control',
    'nav.allNodes': 'Todos los Nodos',
    'nav.nilDB': 'nilDB',
    'nav.nilAI': 'nilAI',
    'nav.validators': 'Validadores',
    'nav.ecosystem': 'Ecosistema',
    
    // Dashboard
    'dashboard.subtitle': 'Neque amet lacus orci turpis enim.',
    'dashboard.searchPlaceholder': 'Buscar nodos, ubicaciones, operadores...',
    
    // Table Headers
    'table.nodeId': 'ID del Nodo',
    'table.location': 'Ubicación',
    'table.operator': 'Operador',
    'table.type': 'Tipo',
    
    // Search
    'search.noResults': 'No se encontraron nodos que coincidan con',
    
    // Metrics
    'metrics.secretsStored': 'Secretos almacenados',
    'metrics.totalSecretSize': 'Tamaño total de secretos',
    'metrics.collectionsCreated': 'Colecciones creadas',
    'metrics.totalValueLocked': 'Valor total bloqueado',
    'metrics.volume24h': 'Volumen 24h',
    'metrics.activeUsers': 'Usuarios activos',
    
    // Ecosystem Page
    'ecosystem.title': 'Panel del Ecosistema',
    'ecosystem.description': '¡Bienvenido al Ecosistema Nillion! Aquí puedes explorar todos los proyectos, aplicaciones y servicios increíbles construidos en la red Nillion. Desde protocolos DeFi hasta plataformas de juegos, descubre las soluciones innovadoras que aprovechan la computación privada.',
    'ecosystem.defi.title': 'Proyectos DeFi',
    'ecosystem.defi.description': 'Comercio privado, préstamos y servicios financieros',
    'ecosystem.gaming.title': 'Juegos y NFTs',
    'ecosystem.gaming.description': 'Experiencias de juego privadas y propiedad oculta de NFT',
    'ecosystem.infrastructure.title': 'Infraestructura',
    'ecosystem.infrastructure.description': 'Herramientas y servicios para computación privada',
    'ecosystem.comingSoon.title': 'Próximamente',
    'ecosystem.comingSoon.description': 'Estamos construyendo un increíble panel del ecosistema que mostrará todos los proyectos, proporcionará análisis detallados y ofrecerá información sobre el creciente ecosistema Nillion. ¡Mantente atento a las actualizaciones!',
    
    // Project Details
    'project.about': 'Acerca de',
    'project.activityOverview': 'Resumen de actividad',
    'project.activityChartPlaceholder': 'Marcador de posición del gráfico de actividad',
    
    // Status
    'status.live': 'En vivo',
    'status.beta': 'Beta',
    
    // Categories
    'category.defi': 'DeFi',
    'category.infrastructure': 'Infraestructura',
    'category.gaming': 'Juegos',
    'category.social': 'Social',
    'category.nft': 'NFT',
    'category.validator': 'Validador',
    'category.dapp': 'DApp',
    
    // Time periods
    'time.7d': '7D',
    'time.30d': '30D',
    'time.all': 'TODO',
    
    // Locations
    'location.london': 'Londres, Reino Unido',
    'location.newYork': 'Nueva York, EE.UU.',
    'location.tokyo': 'Tokio, Japón',
    'location.frankfurt': 'Frankfurt, Alemania',
    'location.singapore': 'Singapur, Singapur',
    'location.sydney': 'Sídney, Australia',
    'location.toronto': 'Toronto, Canadá',
    'location.mumbai': 'Mumbai, India',
  }
};