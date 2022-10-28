function XMLWriter()
{
    this.XML=[];
    this.Nodes=[];
    this.State="";
	this.popupinfo='';

    this.FormatXML = function(Str)
    {
        if (Str)
            return Str.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return ""
    }
    this.BeginNode = function(Name)
    {
        if (!Name) return;
        if (this.State=="beg") this.XML.push(">");
        this.State="beg";
        this.Nodes.push(Name);
        this.XML.push("<"+Name);
    }
    this.EndNode = function()
    {
        if (this.State=="beg")
        {
            this.XML.push("/>");
            this.Nodes.pop();
        }
        else if (this.Nodes.length>0)
            this.XML.push("</"+this.Nodes.pop()+">");
        this.State="";
    }
    this.Attrib = function(Name, Value)
    {
        if (this.State!="beg" || !Name) return;
        this.XML.push(" "+Name+"=\""+this.FormatXML(Value)+"\"");
    }
    this.WriteString = function(Value)
    {
        if (this.State=="beg") this.XML.push(">");
        this.XML.push(this.FormatXML(Value));
        this.State="";
    }
    this.Node = function(Name, Value)
    {
        if (!Name) return;
        if (this.State=="beg") this.XML.push(">");
        this.XML.push((Value=="" || !Value)?"<"+Name+"/>":"<"+Name+">"+this.FormatXML(Value)+"</"+Name+">");
        this.State="";
    }
    this.Close = function()
    {
        while (this.Nodes.length>0)
            this.EndNode();
        this.State="closed";
    }
    this.CloseCriteria = function()
    {
		for (var i=0; i<this.Nodes.length; i++)
		{
			if((this.Nodes[i]=='CRITERIA') || (this.Nodes[i]=='criteria') || (this.Nodes[i]=='Criteria'))
			this.EndNode();
		}
		
    }
    this.CloseList = function()
    {
		for (var i=0; i<this.Nodes.length; i++)
		{
			if((this.Nodes[i]=='LIST') || (this.Nodes[i]=='list') || (this.Nodes[i]=='List'))
			this.EndNode();
		}
		
    }

    this.getPopupInfo = function()
    {
		for(var j=0; j<this.XML.length;j++)
		{
//alert(this.XML[j]);
				if(this.XML[j]=='<REPLYTO' || this.XML[j]=='<replyto' || this.XML[j]=='Replyto')
				{
					return popupinfo=this.XML[++j];
				}
		}
		
    }

    this.ToString = function(){return this.XML.join("");}
}