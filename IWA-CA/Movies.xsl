<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
 <xsl:template match="/">
<table id="mediaBucket" border="1" class="indent">
    <thread>
    <tr>
        <th colspan='8'>The media bucket list</th>
    </tr>
    <tr>
        <th>Select</th>
        <th>Title</th>
	    <th>Genre</th>
	    <th>Director</th>
	    <th>Year</th>
	    <th>Duration</th>
	    <th>Comments</th>
    </tr>
    </thread>
    <tbody>
        <xsl:for-each select="/medialist/category">
            <tr>
                <td colspan="8">
                    <xsl:value-of select="@name" />
                </td>
                </tr>
                    <xsl:for-each select="record">
                        <tr id="{position()}">
                               <td align="center">
                            <input name="record0" type="checkbox" />
                        </td>
                            <td>
                                <xsl:value-of select="title" />
                            </td>
                            <td>
                                <xsl:value-of select="genre" />
                            </td>
                            <td>
                                <xsl:value-of select="director" />

                            </td>
                            <td>
                                <xsl:value-of select="year" />
                            </td>
                                <td>
                                    <xsl:value-of select="duration" />
                                </td>
                                <td>
                                    <xsl:value-of select="comments" />
                                </td>
                            </tr>
                </xsl:for-each>
        </xsl:for-each>
    </tbody>
</table>
 </xsl:template>
</xsl:stylesheet>
