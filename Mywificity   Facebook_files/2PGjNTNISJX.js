/*!CK:1687683592!*//*1426716642,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["MCDLP"]); }

__d("UFICommentLink.react",["React","TrackingNodes","emptyFunction","fbt"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();var k=g,l=k.PropTypes,m=g.createClass({displayName:"UFICommentLink",propTypes:{ufiExperiments:l.object,onClick:l.func},getDefaultProps:function(){return {ufiExperiments:{},onClick:i};},render:function(){var n=j._("Comment"),o=j._("Leave a comment"),p=h.getTrackingInfo(h.types.COMMENT_LINK);return (g.createElement("a",{className:"comment_link",href:"#",role:"button",title:o,onClick:this.props.onClick,"data-ft":p},n));}});e.exports=m;},null);