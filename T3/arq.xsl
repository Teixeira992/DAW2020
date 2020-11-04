<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Arquivo de Arqueosítios do Nordeste Português</title>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <h2 style="text-align:center">Arqueosítios do Nordeste Português</h2>
                    <h3 style="margin:15px">Indíce de Arqueosítios</h3>
                        <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort case-order="upper-first" select="IDENTI"/>
                        </xsl:apply-templates>
                        </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!-- Templates Indice -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>


    <xsl:template match="//LIGA" mode="termo">
        <u style="color:#ff9900"><xsl:value-of select="."/></u>
    </xsl:template>
  
  
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <h1><xsl:value-of select="IDENTI"/></h1>
                    <xsl:apply-templates select="DESCRI" mode="termo"/>
                    
                    <p>
                        <xsl:choose>
                            <xsl:when test="IMAGEM">
                                <b>Imagem:</b><xsl:value-of select="IMAGEM/@NOME"/><br/>
                            </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                            <xsl:when test="LUGAR/text()">
                               <b>Lugar:</b><xsl:value-of select="LUGAR"/><br/>
                            </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                            <xsl:when test="FREGUE/text()">
                                <b>Freguesia:</b><xsl:value-of select="FREGUE"/><br/>
                            </xsl:when>
                        </xsl:choose>  
                        
                        <xsl:choose>
                            <xsl:when test="CONCEL/text()">
                                <b>Concelho:</b><xsl:value-of select="CONCEL"/><br/>
                            </xsl:when>
                        </xsl:choose> 
                        
                        <xsl:choose>
                            <xsl:when test="CODADM/text()">
                                <b>Código Administrativo:</b><xsl:value-of select="CODADM"/><br/>
                             </xsl:when>
                        </xsl:choose>   
                        
                        <xsl:choose>
                            <xsl:when test="CRONO/text()">
                                <b>Cronologia:</b><xsl:value-of select="CRONO"/><br/>
                            </xsl:when>
                        </xsl:choose>
                                
                        <xsl:choose>
                            <xsl:when test="LATITU/text()">
                                <b>Latitude:</b><xsl:value-of select="LATITU"/><br/>
                            </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose>
                            <xsl:when test="LONGIT/text()">    
                                <b>Longitude:</b><xsl:value-of select="LONGIT"/><br/>
                            </xsl:when>
                        </xsl:choose>
                        
                        <xsl:choose> 
                            <xsl:when test="ALTITU/text()">
                                <b>Altitude:</b><xsl:value-of select="ALTITU"/>
                            </xsl:when> 
                        </xsl:choose>
                    </p>
                    
                    <xsl:choose>
                        <xsl:when test="ACESSO/text()">
                            <p><b>Acesso:</b><xsl:apply-templates select="ACESSO" mode="termo"/></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="TRAARQ/text()">
                            <p><b>Trabalhos Arqueológicos:</b><xsl:apply-templates select="TRAAQR" mode="termo"/></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="QUADRO/text()">        
                            <p><b>Quadro:</b><xsl:apply-templates select="QUADRO" mode="termo"/></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="DESARQ/text()">       
                            <p><b>Descrição Arqueológica:</b><xsl:apply-templates select="DESARQ" mode="termo"/></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="INTERP/text()">    
                            <p><b>Interpretação:</b><xsl:apply-templates select="INTERP" mode="termo"/></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="INTERE/text()">    
                            <p><b>Interesse:</b><xsl:apply-templates select="INTERE" mode="termo"/></p>
                        </xsl:when>
                    </xsl:choose>

                    <xsl:choose>
                        <xsl:when test="DEPOSI/text()">    
                            <p><b>Deposito:</b><xsl:apply-templates select="DEPOSI" mode="termo"/></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="BIBLIO/text()">    
                            <p><b>Bibliografia:</b>
                                <xsl:for-each select="BIBLIO">
                                    <xsl:value-of select="."/><br/>
                                </xsl:for-each></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="AUTOR/text()">    
                            <p><b>Autor:</b><xsl:apply-templates select="AUTOR" mode="termo"/></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="DATA/text()">      
                            <p><b>Data:</b><xsl:apply-templates select="DATA" mode="termo"/></p>
                        </xsl:when>
                    </xsl:choose>
                      
                    <address>
                            [<a href="index.html#i{generate-id()}">Voltar à Home</a>]
                    </address>         
                </body>  
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>