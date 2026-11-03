var e=`<h3 id="11-概念" tabindex="-1">1.1. 概念 <a class="heading-anchor" href="#11-概念" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>Elasticsearch：index--&gt; type(7.X废除)--&gt;doc--&gt; field</p>
<p>MySQL:     数据库 --&gt; 表 --&gt; 行 --&gt; 列</p>
<p>在ES 7.X的版本中，已经去掉了type的概念，一个index只有一个默认type，就是_doc。这样index可以理解为数据库或者表。</p>
<ul>
<li>ES 实例：对应 MySQL 实例中的一个 Database。</li>
<li>Index 对应 MySQL 中的 Table 。</li>
<li>Document 对应 MySQL 中表的记录。</li>
</ul>
<h3 id="12-常用命令" tabindex="-1">1.2. 常用命令 <a class="heading-anchor" href="#12-常用命令" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<h4 id="121-常用数据类型" tabindex="-1">1.2.1. 常用数据类型 <a class="heading-anchor" href="#121-常用数据类型" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<h5 id="1211-文本类型" tabindex="-1">1.2.1.1. 文本类型 <a class="heading-anchor" href="#1211-文本类型" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<table>
<thead>
<tr>
<th>Mysql</th>
<th>描述</th>
<th>ES</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td>最大4G</td>
<td>text</td>
<td>长度不限制,默认分词,支持全文检索，不可以排序</td>
</tr>
<tr>
<td>varchar</td>
<td>最大65532字节，uft8下最大为21844字符</td>
<td>keyword</td>
<td>最大32766字节，默认不分词。只能通过精确值搜索到。<br />如果用于过滤、排序、聚合，就设置为此类型</td>
</tr>
</tbody>
</table>
<h5 id="1212-数字类型" tabindex="-1">1.2.1.2. 数字类型 <a class="heading-anchor" href="#1212-数字类型" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<table>
<thead>
<tr>
<th>Mysql</th>
<th>描述</th>
<th>ES</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>int</td>
<td>整数型，4字节<br />取值范围(-2 147 483 648，2 147 483 647)</td>
<td>integer</td>
<td>整数型</td>
</tr>
<tr>
<td>bigint</td>
<td>整数型，8字节<br />取值范围(-9,223,372,036,854,775,808，9 223 372 036 854 775 807)</td>
<td>long</td>
<td>整数型</td>
</tr>
<tr>
<td>float</td>
<td>浮点型，4字节</td>
<td>float</td>
<td>浮点型，4字节</td>
</tr>
<tr>
<td>double</td>
<td>浮点型，8字节</td>
<td>double</td>
<td>浮点型，8字节</td>
</tr>
</tbody>
</table>
<h5 id="1213-时间类型" tabindex="-1">1.2.1.3. 时间类型 <a class="heading-anchor" href="#1213-时间类型" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<table>
<thead>
<tr>
<th>Mysql</th>
<th>描述</th>
<th>ES</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>datetime</td>
<td>8字节，取值范围1000-01-01 00:00:00/9999-12-31 23:59:59</td>
<td>date</td>
<td>日期，支持格式：<br />yyyy-MM-dd HH:mm:ss<br />yyyy-MM-dd<br />epoch_millis（毫秒值）</td>
</tr>
<tr>
<td>timestamp</td>
<td>4字节，表示从1970-01-01 00:00:00到当前的时间秒数<br />结束时间为结束时间是第 <strong>2147483647</strong> 秒，北京时间 <strong>2038-1-19 11:14:07</strong><br />会随着时区变化，而变化</td>
<td>同上</td>
<td>同上</td>
</tr>
</tbody>
</table>
<h5 id="1214-布尔类型" tabindex="-1">1.2.1.4. 布尔类型 <a class="heading-anchor" href="#1214-布尔类型" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<table>
<thead>
<tr>
<th>Mysql</th>
<th>描述</th>
<th>ES</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>tinyint(1)</td>
<td>tinyint，设置长度为1，就表示布尔类型<br />值有：true、false、null</td>
<td>boolean</td>
<td>布尔类型，表示true、false</td>
</tr>
</tbody>
</table>
<h4 id="122-crud" tabindex="-1">1.2.2. CRUD <a class="heading-anchor" href="#122-crud" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<h5 id="1221-创建索引" tabindex="-1">1.2.2.1. 创建索引 <a class="heading-anchor" href="#1221-创建索引" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h6 id="12211-mysql" tabindex="-1">1.2.2.1.1. Mysql <a class="heading-anchor" href="#12211-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>CREATE TABLE \`表名\`  (
  \`字段名1\` 字段类型(字段长度) COMMENT '字段描述',
  \`字段名2\` 字段类型(字段长度) DEFAULT 字段默认值 COMMENT '字段描述',
  PRIMARY KEY (\`id\`)
)
</code></pre></div><h6 id="12212-es" tabindex="-1">1.2.2.1.2. ES <a class="heading-anchor" href="#12212-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>PUT 索引名
{
  &quot;mappings&quot;: {
    &quot;properties&quot;: {
      &quot;字段名&quot;:{
        &quot;type&quot;: &quot;字段数据类型&quot;,
        &quot;index&quot;: true/false
      }
    }
  }
}

type 表示当前字段的数据类型
index 表示是否作为索引，可以作为搜索条件过滤，默认值为true
</code></pre></div><div class="code-block"><pre class="hljs"><code>示例：
PUT car
{
  &quot;mappings&quot;: {
    &quot;properties&quot;: {
      &quot;name&quot;:{
        &quot;type&quot;: &quot;text&quot;
      },
      &quot;brand&quot;:{
      	&quot;type&quot;:&quot;keyword&quot;
      },
      &quot;price&quot;:{
      	&quot;type&quot;:&quot;double&quot;
      },
      &quot;mic&quot;:{
      	&quot;type&quot;:&quot;boolean&quot;
      },
      &quot;image&quot;:{
      	&quot;type&quot;:&quot;keyword&quot;,
      	&quot;index&quot;:false
      }
   }
 }
}
</code></pre></div><h5 id="1222-查看索引-字段结构及设置" tabindex="-1">1.2.2.2. 查看索引-字段结构及设置 <a class="heading-anchor" href="#1222-查看索引-字段结构及设置" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h6 id="12221-mysql" tabindex="-1">1.2.2.2.1. Mysql <a class="heading-anchor" href="#12221-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>desc 表名;
</code></pre></div><h6 id="12222-es" tabindex="-1">1.2.2.2.2. ES <a class="heading-anchor" href="#12222-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>GET 索引名
</code></pre></div><h5 id="1223-修改索引字段" tabindex="-1">1.2.2.3. 修改索引字段 <a class="heading-anchor" href="#1223-修改索引字段" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h6 id="12231-mysql" tabindex="-1">1.2.2.3.1. Mysql <a class="heading-anchor" href="#12231-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>ALTER TABLE 表名
ADD COLUMN 字段名 字段类型(字段长度);
</code></pre></div><h6 id="12232-es" tabindex="-1">1.2.2.3.2. ES <a class="heading-anchor" href="#12232-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>PUT 索引名/_mapping
{
	&quot;properties&quot;:{
		&quot;字段名&quot;:{
			&quot;type&quot;:&quot;字段类型&quot;
		}
	}
}
</code></pre></div><h5 id="1224-插入数据" tabindex="-1">1.2.2.4. 插入数据 <a class="heading-anchor" href="#1224-插入数据" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h6 id="12241-mysql" tabindex="-1">1.2.2.4.1. Mysql <a class="heading-anchor" href="#12241-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>insert info 表名(字段1,字段2) values(字段值1,字段值2);
</code></pre></div><h6 id="12242-es" tabindex="-1">1.2.2.4.2. ES <a class="heading-anchor" href="#12242-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>POST 索引名/_doc
{
	&quot;字段名&quot;:&quot;字段值&quot;
}
</code></pre></div><h6 id="122421-批量插入数据" tabindex="-1">1.2.2.4.2.1. 批量插入数据 <a class="heading-anchor" href="#122421-批量插入数据" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>POST _bulk
{&quot;index&quot;: {&quot;_index&quot;: &quot;索引名&quot;}}
{&quot;字段名&quot;:&quot;字段值&quot;}
{&quot;index&quot;: {&quot;_index&quot;: &quot;索引名&quot;}}
{&quot;字段名&quot;:&quot;字段值&quot;,&quot;字段名&quot;:&quot;字段值&quot;}
</code></pre></div><h5 id="1225-更新数据-先删再加" tabindex="-1">1.2.2.5. 更新数据-先删再加 <a class="heading-anchor" href="#1225-更新数据-先删再加" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<p>这种更新方式，相当于先删除docment，再添加，之前的数据是无法保留的</p>
<div class="code-block"><pre class="hljs"><code>POST 索引名/_doc/索引ID
{
	&quot;字段名&quot;:&quot;字段值&quot;
}
</code></pre></div><h5 id="1226-更新数据-update方式" tabindex="-1">1.2.2.6. 更新数据-update方式 <a class="heading-anchor" href="#1226-更新数据-update方式" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<p>数据保留，只修改指定字段的值</p>
<div class="code-block"><pre class="hljs"><code>POST 索引名/_update/索引ID
{
	&quot;doc&quot;:{
		&quot;字段名&quot;:&quot;字段值&quot;
	}
}
</code></pre></div><h5 id="1227-删除数据-根据文档id删除" tabindex="-1">1.2.2.7. 删除数据-根据文档ID删除 <a class="heading-anchor" href="#1227-删除数据-根据文档id删除" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h6 id="12271-mysql" tabindex="-1">1.2.2.7.1. Mysql <a class="heading-anchor" href="#12271-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>delete from 表名 where id = 待删除id;
</code></pre></div><h6 id="12272-es" tabindex="-1">1.2.2.7.2. ES <a class="heading-anchor" href="#12272-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>DELETE 索引名/_doc/索引id
</code></pre></div><h5 id="1228-删除数据-根据查询条件删除" tabindex="-1">1.2.2.8. 删除数据-根据查询条件删除 <a class="heading-anchor" href="#1228-删除数据-根据查询条件删除" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h6 id="12281-mysql" tabindex="-1">1.2.2.8.1. Mysql <a class="heading-anchor" href="#12281-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>-- 删除表全部数据
delete from 表名;
-- 根据匹配字段值，删除数据
delete from 表名 where 字段1 = 字段1值;
</code></pre></div><h6 id="12282-es" tabindex="-1">1.2.2.8.2. ES <a class="heading-anchor" href="#12282-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code># 这是删除全部数据的方式
POST 索引名/_delete_by_query
{
  &quot;query&quot;: {
    &quot;match_all&quot;: {}
  }
}
</code></pre></div><h5 id="1229-删除索引" tabindex="-1">1.2.2.9. 删除索引 <a class="heading-anchor" href="#1229-删除索引" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h6 id="12291-mysql" tabindex="-1">1.2.2.9.1. Mysql <a class="heading-anchor" href="#12291-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>drop table 表名;
</code></pre></div><h6 id="12292-es" tabindex="-1">1.2.2.9.2. ES <a class="heading-anchor" href="#12292-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>DELETE 索引名
</code></pre></div><h5 id="12210-批量删除索引" tabindex="-1">1.2.2.10. 批量删除索引 <a class="heading-anchor" href="#12210-批量删除索引" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h6 id="122101-mysql" tabindex="-1">1.2.2.10.1. Mysql <a class="heading-anchor" href="#122101-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>drop table 表名1,表名2;
</code></pre></div><h6 id="122102-es" tabindex="-1">1.2.2.10.2. ES <a class="heading-anchor" href="#122102-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>多个索引删除，使用逗号分隔</p>
<div class="code-block"><pre class="hljs"><code>DELETE 索引名1,索引名2
</code></pre></div><h5 id="12211-查询" tabindex="-1">1.2.2.11. 查询 <a class="heading-anchor" href="#12211-查询" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h6 id="122111-查看所有的表" tabindex="-1">1.2.2.11.1. 查看所有的表 <a class="heading-anchor" href="#122111-查看所有的表" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<h6 id="1221111-mysql" tabindex="-1">1.2.2.11.1.1. Mysql <a class="heading-anchor" href="#1221111-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>SHOW TABLES;
或者
SELECT
	table_name,
	table_comment,
	table_rows 
FROM
	information_schema.\`TABLES\` 
WHERE
	table_schema = 'test';
</code></pre></div><h6 id="1221112-es" tabindex="-1">1.2.2.11.1.2. ES <a class="heading-anchor" href="#1221112-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code># 查看所有的索引
GET _cat/indices?v 
# 查看所有以c开头的索引
GET _cat/indices/c*?v
</code></pre></div><h6 id="122112-无查询条件" tabindex="-1">1.2.2.11.2. 无查询条件 <a class="heading-anchor" href="#122112-无查询条件" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<h6 id="1221121-mysql" tabindex="-1">1.2.2.11.2.1. Mysql <a class="heading-anchor" href="#1221121-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>-- 类似于Mysql的全表查询
select * from 表名;
</code></pre></div><h6 id="1221122-es" tabindex="-1">1.2.2.11.2.2. ES <a class="heading-anchor" href="#1221122-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>GET 索引名/_search
{}
</code></pre></div><h6 id="122113-单字段查询-精准查询" tabindex="-1">1.2.2.11.3. 单字段查询-精准查询 <a class="heading-anchor" href="#122113-单字段查询-精准查询" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<h6 id="1221131-mysql" tabindex="-1">1.2.2.11.3.1. Mysql <a class="heading-anchor" href="#1221131-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>-- 类似于Mysql的where 单字段查询
select * from 表名 where 字段名=字段值;
</code></pre></div><h6 id="1221132-es" tabindex="-1">1.2.2.11.3.2. ES <a class="heading-anchor" href="#1221132-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>GET 索引名/_search
{
  &quot;query&quot;: {
    &quot;match&quot;: {
      &quot;字段名&quot;: &quot;字段值&quot;
    }
  }
}
</code></pre></div><h6 id="122114-单字段查询-模糊查询" tabindex="-1">1.2.2.11.4. 单字段查询-模糊查询 <a class="heading-anchor" href="#122114-单字段查询-模糊查询" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<h6 id="1221141-mysql" tabindex="-1">1.2.2.11.4.1. Mysql <a class="heading-anchor" href="#1221141-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>-- 类似于Mysql的where 模糊查询  %表示任意多个字符，包含0个字符。_表示单个字符
select * from 表名 where 字段名 like '%字段值%';
</code></pre></div><h6 id="1221142-es" tabindex="-1">1.2.2.11.4.2. ES <a class="heading-anchor" href="#1221142-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>prefix：根据前缀查询</p>
<p>wildcard：通配符查询，</p>
<div class="code-block"><pre class="hljs"><code>* 表示匹配任意个字符
? 表示匹配单个字符
</code></pre></div><div class="code-block"><pre class="hljs"><code># prefix前缀查询
GET 索引名/_search
{
  &quot;query&quot;: {
    &quot;bool&quot;: {
      &quot;filter&quot;: [
        {
          &quot;prefix&quot;: {
            &quot;字段名&quot;: &quot;字段值&quot;
          }
        }
      ]
    }
  }
}
</code></pre></div><div class="code-block"><pre class="hljs"><code># wildcard查询
GET 索引名/_search
{
  &quot;query&quot;: {
    &quot;bool&quot;: {
      &quot;filter&quot;: [
        {
          &quot;wildcard&quot;: {
            &quot;字段名&quot;: &quot;*字段值*&quot;
          }
        }
      ]
    }
  }
}
</code></pre></div><h6 id="122115-多字段查询" tabindex="-1">1.2.2.11.5. 多字段查询 <a class="heading-anchor" href="#122115-多字段查询" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<h6 id="1221151-mysql" tabindex="-1">1.2.2.11.5.1. Mysql <a class="heading-anchor" href="#1221151-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>-- 类似于Mysql的where 多字段and查询
select * from 表名 where 字段名1 = 字段值1 and 字段值2 = 字段值2;
</code></pre></div><h6 id="1221152-es" tabindex="-1">1.2.2.11.5.2. ES <a class="heading-anchor" href="#1221152-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>GET 索引名/_search
{
  &quot;query&quot;: {
    &quot;bool&quot;: {
      &quot;must&quot;: [
        {
          &quot;match_phrase&quot;: {
            &quot;字段名1&quot;: &quot;字段值1&quot;
          }
        },{
          &quot;match_phrase&quot;: {
            &quot;字段名2&quot;: &quot;字段值2&quot;
          }
        }
      ]
    }
  }
}
</code></pre></div><h6 id="122116-分页查询" tabindex="-1">1.2.2.11.6. 分页查询 <a class="heading-anchor" href="#122116-分页查询" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<h6 id="1221161-mysql" tabindex="-1">1.2.2.11.6.1. Mysql <a class="heading-anchor" href="#1221161-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>-- \${offset}表示偏移量，0表示第一行。\${count}表示返回最大行数
select * from 表名 limit \${offset},\${count};
</code></pre></div><h6 id="1221162-es" tabindex="-1">1.2.2.11.6.2. ES <a class="heading-anchor" href="#1221162-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>GET 索引名/_search
{
	&quot;from&quot;: 开始位置，0表示第一条,
	&quot;size&quot;: 查询文档数
}
</code></pre></div><h6 id="122117-排序" tabindex="-1">1.2.2.11.7. 排序 <a class="heading-anchor" href="#122117-排序" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<h6 id="1221171-mysql" tabindex="-1">1.2.2.11.7.1. Mysql <a class="heading-anchor" href="#1221171-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>-- asc表示正序 desc表示倒序
select * from 表名 order by 字段 asc/desc;
</code></pre></div><h6 id="1221172-es" tabindex="-1">1.2.2.11.7.2. ES <a class="heading-anchor" href="#1221172-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>GET 索引名/_search
{
 &quot;sort&quot;: [
   {
     &quot;字段名&quot;: {
       &quot;order&quot;: &quot;排序类型（asc/desc）&quot;
     }
   }
 ]
}
</code></pre></div><h6 id="122118-只显示某些字段" tabindex="-1">1.2.2.11.8. 只显示某些字段 <a class="heading-anchor" href="#122118-只显示某些字段" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<h6 id="1221181-mysql" tabindex="-1">1.2.2.11.8.1. Mysql <a class="heading-anchor" href="#1221181-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>select 字段1,字段2 from 表名;
</code></pre></div><h6 id="1221182-es" tabindex="-1">1.2.2.11.8.2. ES <a class="heading-anchor" href="#1221182-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>GET 索引/_search
{
  &quot;_source&quot;: [&quot;字段1&quot;,&quot;字段2&quot;]
}
</code></pre></div><h6 id="122119-查询名词解释" tabindex="-1">1.2.2.11.9. 查询名词解释 <a class="heading-anchor" href="#122119-查询名词解释" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<h6 id="1221191-query" tabindex="-1">1.2.2.11.9.1. query <a class="heading-anchor" href="#1221191-query" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>查询关键字，类似于<code>mysql</code>的<code>where</code>关键字</p>
<h6 id="1221192-bool" tabindex="-1">1.2.2.11.9.2. bool <a class="heading-anchor" href="#1221192-bool" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>布尔过滤器，当需要使用多个过滤器时，只需要它们放到<code>bool</code>过滤器中即可。</p>
<p><code>bool</code>由以下部分组成：</p>
<div class="code-block"><pre class="hljs"><code>{
	&quot;bool&quot;:{
		&quot;must&quot;:[],
		&quot;should&quot;:[],
		&quot;must_not&quot;:[]
	}
}

must: 所有的语句都必须（must）匹配，类似于mysql中的AND
must_not：所有的语句都不能（must not）匹配，类似于mysql中的NOT
should：至少一个语句匹配，类似\\于mysql中的OR
</code></pre></div><h6 id="1221193-match" tabindex="-1">1.2.2.11.9.3. match <a class="heading-anchor" href="#1221193-match" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>用于执行全文查询的标准查询，包括<strong>模糊匹配和短语或接近查询。</strong></p>
<p>类似于等号查询，但是需要分查询字段是<code>keyword</code>类型，还是<code>text</code>类型。</p>
<p><code>text</code>默认分词，所以使用<code>match</code>查询会根据查询条件分词查询，分词只要匹配到就展示出来。</p>
<p><code>keyword</code>不分词，使用<code>match</code>就相当于精准匹配。</p>
<div class="code-block"><pre class="hljs"><code>示例
GET car/_search
{
  &quot;query&quot;: {
    &quot;match&quot;: {
      &quot;name&quot;: &quot;马 X3&quot;
    }
  }
}
结果：
{
  &quot;took&quot; : 1,
  &quot;timed_out&quot; : false,
  &quot;_shards&quot; : {
    &quot;total&quot; : 1,
    &quot;successful&quot; : 1,
    &quot;skipped&quot; : 0,
    &quot;failed&quot; : 0
  },
  &quot;hits&quot; : {
    &quot;total&quot; : {
      &quot;value&quot; : 2,
      &quot;relation&quot; : &quot;eq&quot;
    },
    &quot;max_score&quot; : 3.219012,
    &quot;hits&quot; : [
      {
        &quot;_index&quot; : &quot;car&quot;,
        &quot;_type&quot; : &quot;_doc&quot;,
        &quot;_id&quot; : &quot;4HUYfHgBkg6JQRd1IVc6&quot;,
        &quot;_score&quot; : 3.219012,
        &quot;_source&quot; : {
          &quot;name&quot; : &quot;宝马 X3&quot;,
          &quot;brand&quot; : &quot;宝马&quot;,
          &quot;price&quot; : 10.2,
          &quot;mic&quot; : false,
          &quot;image&quot; : &quot;&quot;
        }
      },
      {
        &quot;_index&quot; : &quot;car&quot;,
        &quot;_type&quot; : &quot;_doc&quot;,
        &quot;_id&quot; : &quot;4XUYfHgBkg6JQRd1IVc6&quot;,
        &quot;_score&quot; : 1.3419306,
        &quot;_source&quot; : {
          &quot;name&quot; : &quot;宝马 X5&quot;,
          &quot;brand&quot; : &quot;宝马&quot;,
          &quot;price&quot; : 40.1,
          &quot;mic&quot; : false,
          &quot;image&quot; : &quot;&quot;
        }
      }
    ]
  }
}
</code></pre></div><h6 id="1221194-matchphrase" tabindex="-1">1.2.2.11.9.4. match_phrase <a class="heading-anchor" href="#1221194-matchphrase" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p><code>match_phrase</code> 称为短语搜索，要求所有的分词必须同时出现在文档中，同时位置必须紧邻一致。</p>
<h6 id="1221195-matchphraseprefix" tabindex="-1">1.2.2.11.9.5. match_phrase_prefix <a class="heading-anchor" href="#1221195-matchphraseprefix" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>与<code>match_phrase</code>查询类似，但是会<strong>对最后一个Token在倒排序索引列表中进行通配符搜索</strong></p>
<h6 id="1221196-multimatch" tabindex="-1">1.2.2.11.9.6. multi_match <a class="heading-anchor" href="#1221196-multimatch" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>和<code>match</code>类似，可以匹配多个字段，多个字段是<code>or</code>的关系</p>
<h6 id="1221197-querystring" tabindex="-1">1.2.2.11.9.7. query_string <a class="heading-anchor" href="#1221197-querystring" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>和<code>match_phrase</code>类似，唯一区别的是，分词只要匹配上即可。不需要连续，顺序还可以调换。</p>
<p>类似于<code>match</code>、<code>multi_match</code>的集合，查看示例</p>
<div class="code-block"><pre class="hljs"><code>OR表示两者取一，AND表示两者同时满足，NOT表示不是
# 查询车名 包含马或者长的。
GET car/_search
{
  &quot;query&quot;: {
    &quot;query_string&quot;: {
      &quot;fields&quot;: [&quot;name&quot;],
      &quot;query&quot;: &quot;马 OR 长&quot;
    }
  }
}

# 车名包含马，且包含X3的
GET car/_search
{
  &quot;query&quot;: {
    &quot;query_string&quot;: {
      &quot;fields&quot;: [&quot;name&quot;],
      &quot;query&quot;: &quot;马 AND X3&quot;
    }
  }
}

# 车名包含马，不包含X3的
GET car/_search
{
  &quot;query&quot;: {
    &quot;query_string&quot;: {
      &quot;fields&quot;: [&quot;name&quot;],
      &quot;query&quot;: &quot;马 NOT X3&quot;
    }
  }
}
</code></pre></div><h6 id="1221198-range" tabindex="-1">1.2.2.11.9.8. range <a class="heading-anchor" href="#1221198-range" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>区间查询，查询时间或者范围内查询</p>
<p>示例</p>
<div class="code-block"><pre class="hljs"><code># 查询价格10-20万的车
GET car/_search
{
  &quot;query&quot;: {
    &quot;range&quot;: {
      &quot;price&quot;: {
        &quot;gte&quot;: 10,
        &quot;lte&quot;: 20
      }
    }
  }
}
</code></pre></div><h6 id="1221199-trem" tabindex="-1">1.2.2.11.9.9. trem <a class="heading-anchor" href="#1221199-trem" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p><code>term</code>是代表完全匹配，也就是精确查询，搜索前不会再对搜索词进行分词拆解。<code>term</code>属于精确匹配，只能查单个词</p>
<p>示例：</p>
<div class="code-block"><pre class="hljs"><code># 精确匹配到，车型匹配为宝马的数据
GET car/_search
{
  &quot;query&quot;: {
    &quot;term&quot;: {
      &quot;brand&quot;: {
        &quot;value&quot;: &quot;宝马&quot;
      }
    }
  }
}


</code></pre></div><h6 id="12211910-trems" tabindex="-1">1.2.2.11.9.10. trems <a class="heading-anchor" href="#12211910-trems" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>类似于<code>term</code>，可以匹配多个单词,多个单词间表示或的意思</p>
<p>示例：</p>
<div class="code-block"><pre class="hljs"><code># 可以查询到宝马 X3 和宝马X5,因为是或的关系，所以都查询出来了
GET car/_search
{
  &quot;query&quot;: {
    &quot;terms&quot;: {
      &quot;name&quot;: [&quot;宝&quot;,&quot;X3&quot;]
    }
  }
}

# 查询到宝马 X3，需要用到bool must
GET car/_search
{
  &quot;query&quot;: {
    &quot;bool&quot;: {
      &quot;must&quot;: [
        {
          &quot;term&quot;: {
            &quot;name&quot;: &quot;宝&quot;
          }
        },
        {
          &quot;term&quot;: {
            &quot;name&quot;: &quot;马&quot;
          }
        },
        {
          &quot;term&quot;: {
            &quot;name&quot;: &quot;x3&quot;
          }
        }
      ]
    }
  }
}
疑问点：为什么宝马要分开，X3 要写成x3,这是由分词决定的。查看分词逻辑
GET car/_analyze
{
  &quot;text&quot; : &quot;宝马 X3&quot;
}
分词结果：
{
  &quot;tokens&quot; : [
    {
      &quot;token&quot; : &quot;宝&quot;,
      &quot;start_offset&quot; : 0,
      &quot;end_offset&quot; : 1,
      &quot;type&quot; : &quot;&lt;IDEOGRAPHIC&gt;&quot;,
      &quot;position&quot; : 0
    },
    {
      &quot;token&quot; : &quot;马&quot;,
      &quot;start_offset&quot; : 1,
      &quot;end_offset&quot; : 2,
      &quot;type&quot; : &quot;&lt;IDEOGRAPHIC&gt;&quot;,
      &quot;position&quot; : 1
    },
    {
      &quot;token&quot; : &quot;x3&quot;,
      &quot;start_offset&quot; : 3,
      &quot;end_offset&quot; : 5,
      &quot;type&quot; : &quot;&lt;ALPHANUM&gt;&quot;,
      &quot;position&quot; : 2
    }
  ]
}

</code></pre></div><h5 id="12212-分组查询" tabindex="-1">1.2.2.12. 分组查询 <a class="heading-anchor" href="#12212-分组查询" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h6 id="122121-count查询" tabindex="-1">1.2.2.12.1. count查询 <a class="heading-anchor" href="#122121-count查询" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<h6 id="1221211-mysql" tabindex="-1">1.2.2.12.1.1. Mysql <a class="heading-anchor" href="#1221211-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>select 分组字段,count(0) from 表名 group by 分组字段;
</code></pre></div><h6 id="1221212-es" tabindex="-1">1.2.2.12.1.2. ES <a class="heading-anchor" href="#1221212-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>使用aggs关键字</p>
<p>示例</p>
<div class="code-block"><pre class="hljs"><code># 获取各品牌车辆数量
select brand,count(0) from car group by brand;

# ES 统计各品牌车型数量
GET car/_search
{
  &quot;size&quot;: 0, 
  &quot;aggs&quot;: {
    &quot;brandAgg&quot;: {
      &quot;terms&quot;: {
        &quot;field&quot;: &quot;brand&quot;
      }
    }
  }
}
</code></pre></div><p>size:0 的含义，不显示命中(hits)的文档信息</p>
<h6 id="122122-指标聚合" tabindex="-1">1.2.2.12.2. 指标聚合 <a class="heading-anchor" href="#122122-指标聚合" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<p>max、min、sum、avg这几个函数功能和mysql一致，分别查询最大值，最小值，总数，平均值</p>
<p>示例</p>
<div class="code-block"><pre class="hljs"><code># 获取每个品牌最高的价格
GET car/_search
{
  &quot;size&quot;: 0,
  &quot;aggs&quot;: {
    &quot;brandAgg&quot;: {
      &quot;terms&quot;: {
        &quot;field&quot;: &quot;brand&quot;
      },
      &quot;aggs&quot;: {
        &quot;maxPrice&quot;: {
          &quot;max&quot;: {
            &quot;field&quot;: &quot;price&quot;
          }
        }
      }
    }
  }
}
</code></pre></div><h3 id="13-分词" tabindex="-1">1.3. 分词 <a class="heading-anchor" href="#13-分词" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<h4 id="131-分词插件" tabindex="-1">1.3.1. 分词插件 <a class="heading-anchor" href="#131-分词插件" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<h5 id="1311-ik-analysis" tabindex="-1">1.3.1.1. IK Analysis <a class="heading-anchor" href="#1311-ik-analysis" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<p><strong><a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fmedcl%2Felasticsearch-analysis-ik%2Freleases">https://github.com/medcl/elasticsearch-analysis-ik/releases</a></strong>，选择对应es版本的ik版本。</p>
<p>把插件zip解压到%ES_HOME%/plugins/ 文件夹下，然后重启es即可。注意：zip解压后需要删除</p>
<p>查看分词效果：</p>
<div class="code-block"><pre class="hljs"><code># 使用ik后的中文分词
GET _analyze
{
  &quot;analyzer&quot;: &quot;ik_smart&quot;,
  &quot;text&quot;:&quot;宝马 X5&quot;
}
# 结果
{
  &quot;tokens&quot; : [
    {
      &quot;token&quot; : &quot;宝马&quot;,
      &quot;start_offset&quot; : 0,
      &quot;end_offset&quot; : 2,
      &quot;type&quot; : &quot;CN_WORD&quot;,
      &quot;position&quot; : 0
    },
    {
      &quot;token&quot; : &quot;x5&quot;,
      &quot;start_offset&quot; : 3,
      &quot;end_offset&quot; : 5,
      &quot;type&quot; : &quot;LETTER&quot;,
      &quot;position&quot; : 1
    }
  ]
}

# 使用es默认的分词
GET _analyze
{
  &quot;analyzer&quot;: &quot;default&quot;,
  &quot;text&quot;:&quot;宝马 X5&quot;
}
# 结果
{
  &quot;tokens&quot; : [
    {
      &quot;token&quot; : &quot;宝&quot;,
      &quot;start_offset&quot; : 0,
      &quot;end_offset&quot; : 1,
      &quot;type&quot; : &quot;&lt;IDEOGRAPHIC&gt;&quot;,
      &quot;position&quot; : 0
    },
    {
      &quot;token&quot; : &quot;马&quot;,
      &quot;start_offset&quot; : 1,
      &quot;end_offset&quot; : 2,
      &quot;type&quot; : &quot;&lt;IDEOGRAPHIC&gt;&quot;,
      &quot;position&quot; : 1
    },
    {
      &quot;token&quot; : &quot;x5&quot;,
      &quot;start_offset&quot; : 3,
      &quot;end_offset&quot; : 5,
      &quot;type&quot; : &quot;&lt;ALPHANUM&gt;&quot;,
      &quot;position&quot; : 2
    }
  ]
}

</code></pre></div><h6 id="13111-创建索引时指定分词逻辑" tabindex="-1">1.3.1.1.1. 创建索引时，指定分词逻辑 <a class="heading-anchor" href="#13111-创建索引时指定分词逻辑" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h6>
<div class="code-block"><pre class="hljs"><code>PUT 索引名
{
  &quot;settings&quot;:{
  	&quot;index.analysis.analyzer.default.type&quot;:&quot;ik_smart&quot;
  },
  &quot;mappings&quot;: {
    &quot;properties&quot;: {
      &quot;字段名&quot;:{
        &quot;type&quot;: &quot;字段数据类型&quot;,
        &quot;index&quot;: true/false
      }
    }
  }
}
</code></pre></div><h2 id="2-最后" tabindex="-1">2. 最后 <a class="heading-anchor" href="#2-最后" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h3 id="21-基础数据" tabindex="-1">2.1. 基础数据 <a class="heading-anchor" href="#21-基础数据" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<h4 id="211-mysql" tabindex="-1">2.1.1. Mysql <a class="heading-anchor" href="#211-mysql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><pre class="hljs"><code>
DROP TABLE IF EXISTS \`car\`;
CREATE TABLE \`car\`  (
  \`id\` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  \`name\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '车型',
  \`brand\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '品牌',
  \`price\` double(10, 2) NULL DEFAULT NULL COMMENT '价格',
  \`mic\` smallint(1) NULL DEFAULT NULL COMMENT '是否国产：1-是 0-否',
  \`image\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '照片',
  PRIMARY KEY (\`id\`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '汽车表' ROW_FORMAT = Dynamic;

INSERT INTO \`car\` VALUES (1, '奥迪 A4', '奥迪', 20.10, 0, NULL);
INSERT INTO \`car\` VALUES (2, '奥迪 A6', '奥迪', 30.10, 0, NULL);
INSERT INTO \`car\` VALUES (3, '宝马 X3', '宝马', 10.20, 0, NULL);
INSERT INTO \`car\` VALUES (4, '宝马 X5', '宝马', 40.10, 0, NULL);
INSERT INTO \`car\` VALUES (5, '比亚迪 秦Plus', '比亚迪', 10.58, 1, NULL);
INSERT INTO \`car\` VALUES (6, '哈弗 H6', '长城', 8.56, 1, NULL);
INSERT INTO \`car\` VALUES (7, '长安 CS75', '长安', 9.34, 1, NULL);
INSERT INTO \`car\` VALUES (8, '五菱宏光', '五菱', 3.20, 1, NULL);
</code></pre></div><h4 id="212-es" tabindex="-1">2.1.2. ES <a class="heading-anchor" href="#212-es" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><pre class="hljs"><code>PUT car
{
  &quot;mappings&quot;: {
    &quot;properties&quot;: {
      &quot;name&quot;:{
        &quot;type&quot;: &quot;text&quot;
      },
      &quot;brand&quot;:{
      	&quot;type&quot;:&quot;keyword&quot;
      },
      &quot;price&quot;:{
      	&quot;type&quot;:&quot;double&quot;
      },
      &quot;mic&quot;:{
      	&quot;type&quot;:&quot;boolean&quot;
      },
      &quot;image&quot;:{
      	&quot;type&quot;:&quot;keyword&quot;,
      	&quot;index&quot;:false
      }
   }
 }
}

PUT _bulk
{&quot;index&quot;: {&quot;_index&quot;: &quot;car&quot;}}
{&quot;name&quot;:&quot;奥迪 A4&quot;,&quot;brand&quot;:&quot;奥迪&quot;,&quot;price&quot;:20.10,&quot;mic&quot;:false,&quot;image&quot;:&quot;&quot;}
{&quot;index&quot;: {&quot;_index&quot;: &quot;car&quot;}}
{&quot;name&quot;:&quot;奥迪 A6&quot;,&quot;brand&quot;:&quot;奥迪&quot;,&quot;price&quot;:30.10,&quot;mic&quot;:false,&quot;image&quot;:&quot;&quot;}
{&quot;index&quot;: {&quot;_index&quot;: &quot;car&quot;}}
{&quot;name&quot;:&quot;宝马 X3&quot;,&quot;brand&quot;:&quot;宝马&quot;,&quot;price&quot;:10.20,&quot;mic&quot;:false,&quot;image&quot;:&quot;&quot;}
{&quot;index&quot;: {&quot;_index&quot;: &quot;car&quot;}}
{&quot;name&quot;:&quot;宝马 X5&quot;,&quot;brand&quot;:&quot;宝马&quot;,&quot;price&quot;:40.10,&quot;mic&quot;:false,&quot;image&quot;:&quot;&quot;}
{&quot;index&quot;: {&quot;_index&quot;: &quot;car&quot;}}
{&quot;name&quot;:&quot;比亚迪 秦Plus&quot;,&quot;brand&quot;:&quot;比亚迪&quot;,&quot;price&quot;:10.58,&quot;mic&quot;:true,&quot;image&quot;:&quot;&quot;}
{&quot;index&quot;: {&quot;_index&quot;: &quot;car&quot;}}
{&quot;name&quot;:&quot;哈弗 H6&quot;,&quot;brand&quot;:&quot;长城&quot;,&quot;price&quot;:8.56,&quot;mic&quot;:true,&quot;image&quot;:&quot;&quot;}
{&quot;index&quot;: {&quot;_index&quot;: &quot;car&quot;}}
{&quot;name&quot;:&quot;长安 CS75&quot;,&quot;brand&quot;:&quot;长安&quot;,&quot;price&quot;:9.34,&quot;mic&quot;:true,&quot;image&quot;:&quot;&quot;}
{&quot;index&quot;: {&quot;_index&quot;: &quot;car&quot;}}
{&quot;name&quot;:&quot;五菱宏光&quot;,&quot;brand&quot;:&quot;五菱&quot;,&quot;price&quot;:3.20,&quot;mic&quot;:true,&quot;image&quot;:&quot;&quot;}
</code></pre></div><h3 id="22-es官方文档" tabindex="-1">2.2. ES官方文档 <a class="heading-anchor" href="#22-es官方文档" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<ul>
<li><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html">https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html</a></li>
</ul>
`,t=[{id:`11-概念`,text:`1.1. 概念`,level:3,children:[]},{id:`12-常用命令`,text:`1.2. 常用命令`,level:3,children:[{id:`121-常用数据类型`,text:`1.2.1. 常用数据类型`,level:4,children:[]},{id:`122-crud`,text:`1.2.2. CRUD`,level:4,children:[]}]},{id:`13-分词`,text:`1.3. 分词`,level:3,children:[{id:`131-分词插件`,text:`1.3.1. 分词插件`,level:4,children:[]}]},{id:`2-最后`,text:`2. 最后`,level:2,children:[{id:`21-基础数据`,text:`2.1. 基础数据`,level:3,children:[{id:`211-mysql`,text:`2.1.1. Mysql`,level:4,children:[]},{id:`212-es`,text:`2.1.2. ES`,level:4,children:[]}]},{id:`22-es官方文档`,text:`2.2. ES官方文档`,level:3,children:[]}]}],n={html:e,toc:t};export{n as default,e as html,t as toc};