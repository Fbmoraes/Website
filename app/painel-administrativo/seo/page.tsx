"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  TrendingUp,
  Globe,
  Eye,
  Users,
  MousePointer,
  BarChart3,
  Target,
  CheckCircle,
  AlertCircle,
  XCircle,
  ExternalLink,
  Copy,
  Download,
  RefreshCw,
  Settings,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"

interface SEOMetrics {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: string
  topKeywords: string[]
  topPages: { page: string; views: number }[]
  searchConsoleClicks: number
  searchConsoleImpressions: number
  searchConsoleCTR: number
  avgPosition: number
}

interface SEOIssue {
  type: "error" | "warning" | "success"
  title: string
  description: string
  page?: string
  priority: "high" | "medium" | "low"
}

export default function SEODashboard() {
  const router = useRouter()
  const { isAuthenticated, settings, updateSettings } = useStore()
  const [activeTab, setActiveTab] = useState("overview")
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "PrintsBrindes - Presentes e Artigos Personalizados",
    siteDescription:
      "Presentes e artigos para festas personalizados! Canecas, cadernos, bolos e muito mais, tudo personalizado do seu jeito!",
    keywords:
      "presentes personalizados, brindes, festas, canecas, cadernos, bolos, personalização, Guaratiba, Rio de Janeiro",
    googleAnalyticsId: "",
    googleSearchConsoleId: "",
    facebookPixelId: "",
    customDomain: "printsbrindes.com.br",
  })

  // Mock SEO metrics (in production, these would come from real analytics APIs)
  const [metrics, setMetrics] = useState<SEOMetrics>({
    pageViews: 1250,
    uniqueVisitors: 890,
    bounceRate: 45.2,
    avgSessionDuration: "2m 34s",
    topKeywords: [
      "presentes personalizados",
      "brindes festa",
      "canecas personalizadas",
      "bolos personalizados",
      "lembrancinhas",
    ],
    topPages: [
      { page: "/", views: 450 },
      { page: "/produtos", views: 320 },
      { page: "/produto/relogio-personalizado", views: 180 },
      { page: "/produto/caderno-colorir", views: 150 },
      { page: "/sobre-nos", views: 100 },
    ],
    searchConsoleClicks: 234,
    searchConsoleImpressions: 5670,
    searchConsoleCTR: 4.1,
    avgPosition: 12.5,
  })

  const [seoIssues, setSeoIssues] = useState<SEOIssue[]>([
    {
      type: "success",
      title: "Sitemap.xml configurado",
      description: "Sitemap está ativo e sendo indexado pelo Google",
      priority: "low",
    },
    {
      type: "success",
      title: "Robots.txt configurado",
      description: "Arquivo robots.txt está configurado corretamente",
      priority: "low",
    },
    {
      type: "warning",
      title: "Google Analytics não configurado",
      description: "Configure o Google Analytics para acompanhar o tráfego do site",
      priority: "high",
    },
    {
      type: "warning",
      title: "Google Search Console não verificado",
      description: "Verifique seu site no Google Search Console para monitorar a indexação",
      priority: "high",
    },
    {
      type: "error",
      title: "Algumas imagens sem alt text",
      description: "Adicione texto alternativo em todas as imagens para melhorar a acessibilidade",
      page: "/produtos",
      priority: "medium",
    },
  ])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/area-administrativa")
    }
  }, [isAuthenticated, router])

  const handleSaveSEOSettings = () => {
    // In a real implementation, you would save these to your backend
    alert("✅ Configurações de SEO salvas com sucesso!")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("📋 Copiado para a área de transferência!")
  }

  const generateSitemap = () => {
    alert("✅ Sitemap regenerado com sucesso!")
  }

  if (!isAuthenticated) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="PrintsBrindes Logo" width={120} height={40} />
          </div>
          <div className="flex items-center space-x-4">
            <a href="/painel-administrativo" className="text-pink-500 hover:text-pink-600">
              <ArrowLeft className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* SEO Dashboard Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard SEO</h1>
              <p className="text-gray-600">Monitore e otimize a performance do seu site nos mecanismos de busca</p>
            </div>
            <Button onClick={generateSitemap} className="bg-pink-500 hover:bg-pink-600 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar Sitemap
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
              <TabsTrigger value="pages">Páginas</TabsTrigger>
              <TabsTrigger value="issues">Problemas</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Visualizações</p>
                        <p className="text-2xl font-bold text-gray-800">{metrics.pageViews.toLocaleString()}</p>
                        <p className="text-green-600 text-sm">+12% vs mês anterior</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Visitantes Únicos</p>
                        <p className="text-2xl font-bold text-gray-800">{metrics.uniqueVisitors.toLocaleString()}</p>
                        <p className="text-green-600 text-sm">+8% vs mês anterior</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <MousePointer className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Taxa de Rejeição</p>
                        <p className="text-2xl font-bold text-gray-800">{metrics.bounceRate}%</p>
                        <p className="text-red-600 text-sm">+2% vs mês anterior</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Posição Média</p>
                        <p className="text-2xl font-bold text-gray-800">{metrics.avgPosition}</p>
                        <p className="text-green-600 text-sm">-1.2 vs mês anterior</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search Console Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="w-5 h-5" />
                      <span>Google Search Console</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cliques</span>
                        <span className="font-bold text-gray-800">{metrics.searchConsoleClicks}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Impressões</span>
                        <span className="font-bold text-gray-800">
                          {metrics.searchConsoleImpressions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">CTR</span>
                        <span className="font-bold text-gray-800">{metrics.searchConsoleCTR}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Páginas Mais Visitadas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {metrics.topPages.map((page, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">{page.page}</span>
                          <span className="font-medium text-gray-800">{page.views}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Keywords Tab */}
            <TabsContent value="keywords" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Palavras-chave Principais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics.topKeywords.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-800">{keyword}</span>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="secondary">Posição: {Math.floor(Math.random() * 20) + 1}</Badge>
                            <Badge variant="outline">Volume: {Math.floor(Math.random() * 1000) + 100}/mês</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sugestões de Palavras-chave</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "lembrancinhas personalizadas guaratiba",
                      "presentes únicos rio de janeiro",
                      "brindes corporativos rj",
                      "festa infantil personalizada",
                      "canecas com foto rio de janeiro",
                      "bolos decorados guaratiba",
                    ].map((keyword, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <span className="text-gray-800">{keyword}</span>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            Dificuldade: Baixa
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Volume: {Math.floor(Math.random() * 500) + 50}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pages Tab */}
            <TabsContent value="pages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance das Páginas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Página</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Visualizações</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Taxa de Rejeição</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Tempo na Página</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Status SEO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { page: "/", views: 450, bounce: "42%", time: "3m 12s", status: "good" },
                          { page: "/produtos", views: 320, bounce: "38%", time: "4m 05s", status: "good" },
                          {
                            page: "/produto/relogio-personalizado",
                            views: 180,
                            bounce: "35%",
                            time: "2m 45s",
                            status: "warning",
                          },
                          { page: "/sobre-nos", views: 100, bounce: "55%", time: "1m 30s", status: "error" },
                          { page: "/contato", views: 85, bounce: "25%", time: "2m 10s", status: "good" },
                        ].map((row, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 text-gray-800">{row.page}</td>
                            <td className="py-4 px-4 text-gray-800">{row.views}</td>
                            <td className="py-4 px-4 text-gray-800">{row.bounce}</td>
                            <td className="py-4 px-4 text-gray-800">{row.time}</td>
                            <td className="py-4 px-4">
                              {row.status === "good" && <Badge className="bg-green-100 text-green-700">Ótimo</Badge>}
                              {row.status === "warning" && (
                                <Badge className="bg-yellow-100 text-yellow-700">Atenção</Badge>
                              )}
                              {row.status === "error" && <Badge className="bg-red-100 text-red-700">Problema</Badge>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Issues Tab */}
            <TabsContent value="issues" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Problemas de SEO Detectados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {seoIssues.map((issue, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                        <div className="mt-1">
                          {issue.type === "success" && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {issue.type === "warning" && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                          {issue.type === "error" && <XCircle className="w-5 h-5 text-red-500" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-gray-800">{issue.title}</h3>
                            <Badge
                              variant={
                                issue.priority === "high"
                                  ? "destructive"
                                  : issue.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {issue.priority === "high" ? "Alta" : issue.priority === "medium" ? "Média" : "Baixa"}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{issue.description}</p>
                          {issue.page && <p className="text-gray-500 text-xs mt-1">Página: {issue.page}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Básicas de SEO</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="siteTitle">Título do Site</Label>
                      <Input
                        id="siteTitle"
                        value={seoSettings.siteTitle}
                        onChange={(e) => setSeoSettings({ ...seoSettings, siteTitle: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteDescription">Descrição do Site</Label>
                      <Textarea
                        id="siteDescription"
                        value={seoSettings.siteDescription}
                        onChange={(e) => setSeoSettings({ ...seoSettings, siteDescription: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="keywords">Palavras-chave (separadas por vírgula)</Label>
                      <Textarea
                        id="keywords"
                        value={seoSettings.keywords}
                        onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customDomain">Domínio Personalizado</Label>
                      <Input
                        id="customDomain"
                        value={seoSettings.customDomain}
                        onChange={(e) => setSeoSettings({ ...seoSettings, customDomain: e.target.value })}
                        placeholder="seudominio.com.br"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Integrações de Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                      <Input
                        id="googleAnalytics"
                        value={seoSettings.googleAnalyticsId}
                        onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalyticsId: e.target.value })}
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="searchConsole">Google Search Console</Label>
                      <Input
                        id="searchConsole"
                        value={seoSettings.googleSearchConsoleId}
                        onChange={(e) => setSeoSettings({ ...seoSettings, googleSearchConsoleId: e.target.value })}
                        placeholder="Código de verificação"
                      />
                    </div>
                    <div>
                      <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                      <Input
                        id="facebookPixel"
                        value={seoSettings.facebookPixelId}
                        onChange={(e) => setSeoSettings({ ...seoSettings, facebookPixelId: e.target.value })}
                        placeholder="123456789012345"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Ferramentas SEO</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-medium text-gray-800 mb-2">Sitemap.xml</h3>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard("https://printsbrindes.com.br/sitemap.xml")}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copiar URL
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Visualizar
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-medium text-gray-800 mb-2">Robots.txt</h3>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard("https://printsbrindes.com.br/robots.txt")}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copiar URL
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Visualizar
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <Download className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <h3 className="font-medium text-gray-800 mb-2">Relatório SEO</h3>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Baixar PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Compartilhar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveSEOSettings} className="bg-pink-500 hover:bg-pink-600 text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
