/*!CK:1397856614!*//*1425964085,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["ccpBO"]); }

/**
 * @providesModule Int64
 * @preserve-header
 * @nolint
 * @nopackage
 */__d("Int64",[],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();Int64=function(g,h){this.low_=g;this.high_=h;};Int64.IntCache_={};Int64.fromInt=function(g){if(-128<=g&&g<128){var h=Int64.IntCache_[g];if(h)return h;}var i=new Int64(g|0,g<0?-1:0);if(-128<=g&&g<128)Int64.IntCache_[g]=i;return i;};Int64.fromNumber=function(g){if(isNaN(g)||!isFinite(g)){return Int64.ZERO;}else if(g<=-Int64.TWO_PWR_63_DBL_){return Int64.MIN_VALUE;}else if(g+1>=Int64.TWO_PWR_63_DBL_){return Int64.MAX_VALUE;}else if(g<0){return Int64.fromNumber(-g).negate();}else return new Int64((g%Int64.TWO_PWR_32_DBL_)|0,(g/Int64.TWO_PWR_32_DBL_)|0);};Int64.fromBits=function(g,h){return new Int64(g,h);};Int64.fromString=function(g,h){if(g.length==0)throw Error('number format error: empty string');var i=h||10;if(i<2||36<i)throw Error('radix out of range: '+i);if(g.charAt(0)=='-'){return Int64.fromString(g.substring(1),i).negate();}else if(g.indexOf('-')>=0)throw Error('number format error: interior "-" character: '+g);var j=Int64.fromNumber(Math.pow(i,8)),k=Int64.ZERO;for(var l=0;l<g.length;l+=8){var m=Math.min(8,g.length-l),n=parseInt(g.substring(l,l+m),i);if(m<8){var o=Int64.fromNumber(Math.pow(i,m));k=k.multiply(o).add(Int64.fromNumber(n));}else{k=k.multiply(j);k=k.add(Int64.fromNumber(n));}}return k;};Int64.TWO_PWR_16_DBL_=1<<16;Int64.TWO_PWR_24_DBL_=1<<24;Int64.TWO_PWR_32_DBL_=Int64.TWO_PWR_16_DBL_*Int64.TWO_PWR_16_DBL_;Int64.TWO_PWR_31_DBL_=Int64.TWO_PWR_32_DBL_/2;Int64.TWO_PWR_48_DBL_=Int64.TWO_PWR_32_DBL_*Int64.TWO_PWR_16_DBL_;Int64.TWO_PWR_64_DBL_=Int64.TWO_PWR_32_DBL_*Int64.TWO_PWR_32_DBL_;Int64.TWO_PWR_63_DBL_=Int64.TWO_PWR_64_DBL_/2;Int64.ZERO=Int64.fromInt(0);Int64.ONE=Int64.fromInt(1);Int64.NEG_ONE=Int64.fromInt(-1);Int64.MAX_VALUE=Int64.fromBits(4294967295|0,2147483647|0);Int64.MIN_VALUE=Int64.fromBits(0,2147483648|0);Int64.TWO_PWR_24_=Int64.fromInt(1<<24);Int64.prototype.toInt=function(){return this.low_;};Int64.prototype.toNumber=function(){return this.high_*Int64.TWO_PWR_32_DBL_+this.getLowBitsUnsigned();};Int64.prototype.toUnsignedBits=function(){var g=[],h=31;for(var i=32;i<64;i++){g[i]=(this.low_>>h)&1;h-=1;}h=31;for(var i=0;i<32;i++){g[i]=(this.high_>>h)&1;h-=1;}return g.join('');};Int64.prototype.toString=function(g){var h=g||10;if(h<2||36<h)throw Error('radix out of range: '+h);if(this.isZero())return '0';if(this.isNegative())if(this.equals(Int64.MIN_VALUE)){var i=Int64.fromNumber(h),j=this.div(i),k=j.multiply(i).subtract(this);return j.toString(h)+k.toInt().toString(h);}else return '-'+this.negate().toString(h);var l=Int64.fromNumber(Math.pow(h,6)),k=this,m='';while(true){var n=k.div(l),o=k.subtract(n.multiply(l)).toInt(),p=o.toString(h);k=n;if(k.isZero()){return p+m;}else{while(p.length<6)p='0'+p;m=''+p+m;}}};Int64.prototype.getHighBits=function(){return this.high_;};Int64.prototype.getLowBits=function(){return this.low_;};Int64.prototype.getLowBitsUnsigned=function(){return (this.low_>=0)?this.low_:Int64.TWO_PWR_32_DBL_+this.low_;};Int64.prototype.getNumBitsAbs=function(){if(this.isNegative()){if(this.equals(Int64.MIN_VALUE)){return 64;}else return this.negate().getNumBitsAbs();}else{var g=this.high_!=0?this.high_:this.low_;for(var h=31;h>0;h--)if((g&(1<<h))!=0)break;return this.high_!=0?h+33:h+1;}};Int64.prototype.isZero=function(){return this.high_==0&&this.low_==0;};Int64.prototype.isNegative=function(){return this.high_<0;};Int64.prototype.isOdd=function(){return (this.low_&1)==1;};Int64.prototype.equals=function(g){return (this.high_==g.high_)&&(this.low_==g.low_);};Int64.prototype.notEquals=function(g){return (this.high_!=g.high_)||(this.low_!=g.low_);};Int64.prototype.lessThan=function(g){return this.compare(g)<0;};Int64.prototype.lessThanOrEqual=function(g){return this.compare(g)<=0;};Int64.prototype.greaterThan=function(g){return this.compare(g)>0;};Int64.prototype.greaterThanOrEqual=function(g){return this.compare(g)>=0;};Int64.prototype.compare=function(g){if(this.equals(g))return 0;var h=this.isNegative(),i=g.isNegative();if(h&&!i)return -1;if(!h&&i)return 1;if(this.subtract(g).isNegative()){return -1;}else return 1;};Int64.prototype.negate=function(){if(this.equals(Int64.MIN_VALUE)){return Int64.MIN_VALUE;}else return this.not().add(Int64.ONE);};Int64.prototype.add=function(g){var h=this.high_>>>16,i=this.high_&65535,j=this.low_>>>16,k=this.low_&65535,l=g.high_>>>16,m=g.high_&65535,n=g.low_>>>16,o=g.low_&65535,p=0,q=0,r=0,s=0;s+=k+o;r+=s>>>16;s&=65535;r+=j+n;q+=r>>>16;r&=65535;q+=i+m;p+=q>>>16;q&=65535;p+=h+l;p&=65535;return Int64.fromBits((r<<16)|s,(p<<16)|q);};Int64.prototype.subtract=function(g){return this.add(g.negate());};Int64.prototype.multiply=function(g){if(this.isZero()){return Int64.ZERO;}else if(g.isZero())return Int64.ZERO;if(this.equals(Int64.MIN_VALUE)){return g.isOdd()?Int64.MIN_VALUE:Int64.ZERO;}else if(g.equals(Int64.MIN_VALUE))return this.isOdd()?Int64.MIN_VALUE:Int64.ZERO;if(this.isNegative()){if(g.isNegative()){return this.negate().multiply(g.negate());}else return this.negate().multiply(g).negate();}else if(g.isNegative())return this.multiply(g.negate()).negate();if(this.lessThan(Int64.TWO_PWR_24_)&&g.lessThan(Int64.TWO_PWR_24_))return Int64.fromNumber(this.toNumber()*g.toNumber());var h=this.high_>>>16,i=this.high_&65535,j=this.low_>>>16,k=this.low_&65535,l=g.high_>>>16,m=g.high_&65535,n=g.low_>>>16,o=g.low_&65535,p=0,q=0,r=0,s=0;s+=k*o;r+=s>>>16;s&=65535;r+=j*o;q+=r>>>16;r&=65535;r+=k*n;q+=r>>>16;r&=65535;q+=i*o;p+=q>>>16;q&=65535;q+=j*n;p+=q>>>16;q&=65535;q+=k*m;p+=q>>>16;q&=65535;p+=h*o+i*n+j*m+k*l;p&=65535;return Int64.fromBits((r<<16)|s,(p<<16)|q);};Int64.prototype.div=function(g){if(g.isZero()){throw Error('division by zero');}else if(this.isZero())return Int64.ZERO;if(this.equals(Int64.MIN_VALUE)){if(g.equals(Int64.ONE)||g.equals(Int64.NEG_ONE)){return Int64.MIN_VALUE;}else if(g.equals(Int64.MIN_VALUE)){return Int64.ONE;}else{var h=this.shiftRight(1),i=h.div(g).shiftLeft(1);if(i.equals(Int64.ZERO)){return g.isNegative()?Int64.ONE:Int64.NEG_ONE;}else{var j=this.subtract(g.multiply(i)),k=i.add(j.div(g));return k;}}}else if(g.equals(Int64.MIN_VALUE))return Int64.ZERO;if(this.isNegative()){if(g.isNegative()){return this.negate().div(g.negate());}else return this.negate().div(g).negate();}else if(g.isNegative())return this.div(g.negate()).negate();var l=Int64.ZERO,j=this;while(j.greaterThanOrEqual(g)){var i=Math.max(1,Math.floor(j.toNumber()/g.toNumber())),m=Math.ceil(Math.log(i)/Math.LN2),n=(m<=48)?1:Math.pow(2,m-48),o=Int64.fromNumber(i),p=o.multiply(g);while(p.isNegative()||p.greaterThan(j)){i-=n;o=Int64.fromNumber(i);p=o.multiply(g);}if(o.isZero())o=Int64.ONE;l=l.add(o);j=j.subtract(p);}return l;};Int64.prototype.modulo=function(g){return this.subtract(this.div(g).multiply(g));};Int64.prototype.not=function(){return Int64.fromBits(~this.low_,~this.high_);};Int64.prototype.and=function(g){return Int64.fromBits(this.low_&g.low_,this.high_&g.high_);};Int64.prototype.or=function(g){return Int64.fromBits(this.low_|g.low_,this.high_|g.high_);};Int64.prototype.xor=function(g){return Int64.fromBits(this.low_^g.low_,this.high_^g.high_);};Int64.prototype.shiftLeft=function(g){g&=63;if(g==0){return this;}else{var h=this.low_;if(g<32){var i=this.high_;return Int64.fromBits(h<<g,(i<<g)|(h>>>(32-g)));}else return Int64.fromBits(0,h<<(g-32));}};Int64.prototype.shiftRight=function(g){g&=63;if(g==0){return this;}else{var h=this.high_;if(g<32){var i=this.low_;return Int64.fromBits((i>>>g)|(h<<(32-g)),h>>g);}else return Int64.fromBits(h>>(g-32),h>=0?0:-1);}};Int64.prototype.shiftRightUnsigned=function(g){g&=63;if(g==0){return this;}else{var h=this.high_;if(g<32){var i=this.low_;return Int64.fromBits((i>>>g)|(h<<(32-g)),h>>>g);}else if(g==32){return Int64.fromBits(h,0);}else return Int64.fromBits(h>>>(g-32),0);}};e.exports=Int64;},null);