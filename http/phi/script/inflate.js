/*
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(e){function S(){function h(e,t,r,u,h,p,d,v,m,g,y){var b,w,S,x,T,N,C,k,L,A,O,M,_,D,P;A=0,T=r;do i[e[t+A]]++,A++,T--;while(T!==0);if(i[0]==r)return d[0]=-1,v[0]=0,n;k=v[0];for(N=1;N<=E;N++)if(i[N]!==0)break;C=N,k<N&&(k=N);for(T=E;T!==0;T--)if(i[T]!==0)break;S=T,k>T&&(k=T),v[0]=k;for(D=1<<N;N<T;N++,D<<=1)if((D-=i[N])<0)return o;if((D-=i[T])<0)return o;i[T]+=D,c[1]=N=0,A=1,_=2;while(--T!==0)c[_]=N+=i[A],_++,A++;T=0,A=0;do(N=e[t+A])!==0&&(y[c[N]++]=T),A++;while(++T<r);r=c[S],c[0]=T=0,A=0,x=-1,M=-k,f[0]=0,O=0,P=0;for(;C<=S;C++){b=i[C];while(b--!==0){while(C>M+k){x++,M+=k,P=S-M,P=P>k?k:P;if((w=1<<(N=C-M))>b+1){w-=b+1,_=C;if(N<P)while(++N<P){if((w<<=1)<=i[++_])break;w-=i[_]}}P=1<<N;if(g[0]+P>l)return o;f[x]=O=g[0],g[0]+=P,x!==0?(c[x]=T,s[0]=N,s[1]=k,N=T>>>M-k,s[2]=O-f[x-1]-N,m.set(s,(f[x-1]+N)*3)):d[0]=O}s[1]=C-M,A>=r?s[0]=192:y[A]<u?(s[0]=y[A]<256?0:96,s[2]=y[A++]):(s[0]=p[y[A]-u]+16+64,s[2]=h[y[A++]-u]),w=1<<C-M;for(N=T>>>M;N<P;N+=w)m.set(s,(O+N)*3);for(N=1<<C-1;(T&N)!==0;N>>>=1)T^=N;T^=N,L=(1<<M)-1;while((T&L)!=c[x])x--,M-=k,L=(1<<M)-1}}return D!==0&&S!=1?a:n}function p(e){var n;t||(t=[],r=[],i=new Int32Array(E+1),s=[],f=new Int32Array(E),c=new Int32Array(E+1)),r.length<e&&(r=[]);for(n=0;n<e;n++)r[n]=0;for(n=0;n<E+1;n++)i[n]=0;for(n=0;n<3;n++)s[n]=0;f.set(i.subarray(0,E),0),c.set(i.subarray(0,E+1),0)}var e=this,t,r,i,s,f,c;e.inflate_trees_bits=function(e,n,i,s,u){var f;p(19),t[0]=0,f=h(e,0,19,19,null,null,i,n,s,t,r);if(f==o)u.msg="oversubscribed dynamic bit lengths tree";else if(f==a||n[0]===0)u.msg="incomplete dynamic bit lengths tree",f=o;return f},e.inflate_trees_dynamic=function(e,i,s,f,l,c,d,v,m){var E;return p(288),t[0]=0,E=h(s,0,e,257,g,y,c,f,v,t,r),E!=n||f[0]===0?(E==o?m.msg="oversubscribed literal/length tree":E!=u&&(m.msg="incomplete literal/length tree",E=o),E):(p(288),E=h(s,e,i,0,b,w,d,l,v,t,r),E!=n||l[0]===0&&e>257?(E==o?m.msg="oversubscribed distance tree":E==a?(m.msg="incomplete distance tree",E=o):E!=u&&(m.msg="empty distance tree with lengths",E=o),E):n)}}function D(){function w(e,t,i,s,u,a,l,c){var h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k;y=c.next_in_index,b=c.avail_in,m=l.bitb,g=l.bitk,w=l.write,E=w<l.read?l.read-w-1:l.end-w,S=f[e],x=f[t];do{while(g<20)b--,m|=(c.read_byte(y++)&255)<<g,g+=8;h=m&S,p=i,d=s,k=(d+h)*3;if((v=p[k])===0){m>>=p[k+1],g-=p[k+1],l.window[w++]=p[k+2],E--;continue}do{m>>=p[k+1],g-=p[k+1];if((v&16)!==0){v&=15,T=p[k+2]+(m&f[v]),m>>=v,g-=v;while(g<15)b--,m|=(c.read_byte(y++)&255)<<g,g+=8;h=m&x,p=u,d=a,k=(d+h)*3,v=p[k];do{m>>=p[k+1],g-=p[k+1];if((v&16)!==0){v&=15;while(g<v)b--,m|=(c.read_byte(y++)&255)<<g,g+=8;N=p[k+2]+(m&f[v]),m>>=v,g-=v,E-=T;if(w>=N)C=w-N,w-C>0&&2>w-C?(l.window[w++]=l.window[C++],l.window[w++]=l.window[C++],T-=2):(l.window.set(l.window.subarray(C,C+2),w),w+=2,C+=2,T-=2);else{C=w-N;do C+=l.end;while(C<0);v=l.end-C;if(T>v){T-=v;if(w-C>0&&v>w-C){do l.window[w++]=l.window[C++];while(--v!==0)}else l.window.set(l.window.subarray(C,C+v),w),w+=v,C+=v,v=0;C=0}}if(w-C>0&&T>w-C){do l.window[w++]=l.window[C++];while(--T!==0)}else l.window.set(l.window.subarray(C,C+T),w),w+=T,C+=T,T=0;break}if((v&64)!==0)return c.msg="invalid distance code",T=c.avail_in-b,T=g>>3<T?g>>3:T,b+=T,y-=T,g-=T<<3,l.bitb=m,l.bitk=g,c.avail_in=b,c.total_in+=y-c.next_in_index,c.next_in_index=y,l.write=w,o;h+=p[k+2],h+=m&f[v],k=(d+h)*3,v=p[k]}while(!0);break}if((v&64)!==0)return(v&32)!==0?(T=c.avail_in-b,T=g>>3<T?g>>3:T,b+=T,y-=T,g-=T<<3,l.bitb=m,l.bitk=g,c.avail_in=b,c.total_in+=y-c.next_in_index,c.next_in_index=y,l.write=w,r):(c.msg="invalid literal/length code",T=c.avail_in-b,T=g>>3<T?g>>3:T,b+=T,y-=T,g-=T<<3,l.bitb=m,l.bitk=g,c.avail_in=b,c.total_in+=y-c.next_in_index,c.next_in_index=y,l.write=w,o);h+=p[k+2],h+=m&f[v],k=(d+h)*3;if((v=p[k])===0){m>>=p[k+1],g-=p[k+1],l.window[w++]=p[k+2],E--;break}}while(!0)}while(E>=258&&b>=10);return T=c.avail_in-b,T=g>>3<T?g>>3:T,b+=T,y-=T,g-=T<<3,l.bitb=m,l.bitk=g,c.avail_in=b,c.total_in+=y-c.next_in_index,c.next_in_index=y,l.write=w,n}var e=this,t,i=0,u,a=0,l=0,c=0,h=0,p=0,d=0,v=0,m,g=0,y,b=0;e.init=function(e,n,r,i,s,o){t=x,d=e,v=n,m=r,g=i,y=s,b=o,u=null},e.proc=function(e,E,S){var D,P,H,B=0,j=0,F=0,I,q,R,U;F=E.next_in_index,I=E.avail_in,B=e.bitb,j=e.bitk,q=e.write,R=q<e.read?e.read-q-1:e.end-q;for(;;)switch(t){case x:if(R>=258&&I>=10){e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,S=w(d,v,m,g,y,b,e,E),F=E.next_in_index,I=E.avail_in,B=e.bitb,j=e.bitk,q=e.write,R=q<e.read?e.read-q-1:e.end-q;if(S!=n){t=S==r?O:_;break}}l=d,u=m,a=g,t=T;case T:D=l;while(j<D){if(I===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);S=n,I--,B|=(E.read_byte(F++)&255)<<j,j+=8}P=(a+(B&f[D]))*3,B>>>=u[P+1],j-=u[P+1],H=u[P];if(H===0){c=u[P+2],t=A;break}if((H&16)!==0){h=H&15,i=u[P+2],t=N;break}if((H&64)===0){l=H,a=P/3+u[P+2];break}if((H&32)!==0){t=O;break}return t=_,E.msg="invalid literal/length code",S=o,e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);case N:D=h;while(j<D){if(I===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);S=n,I--,B|=(E.read_byte(F++)&255)<<j,j+=8}i+=B&f[D],B>>=D,j-=D,l=v,u=y,a=b,t=C;case C:D=l;while(j<D){if(I===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);S=n,I--,B|=(E.read_byte(F++)&255)<<j,j+=8}P=(a+(B&f[D]))*3,B>>=u[P+1],j-=u[P+1],H=u[P];if((H&16)!==0){h=H&15,p=u[P+2],t=k;break}if((H&64)===0){l=H,a=P/3+u[P+2];break}return t=_,E.msg="invalid distance code",S=o,e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);case k:D=h;while(j<D){if(I===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);S=n,I--,B|=(E.read_byte(F++)&255)<<j,j+=8}p+=B&f[D],B>>=D,j-=D,t=L;case L:U=q-p;while(U<0)U+=e.end;while(i!==0){if(R===0){q==e.end&&e.read!==0&&(q=0,R=q<e.read?e.read-q-1:e.end-q);if(R===0){e.write=q,S=e.inflate_flush(E,S),q=e.write,R=q<e.read?e.read-q-1:e.end-q,q==e.end&&e.read!==0&&(q=0,R=q<e.read?e.read-q-1:e.end-q);if(R===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S)}}e.window[q++]=e.window[U++],R--,U==e.end&&(U=0),i--}t=x;break;case A:if(R===0){q==e.end&&e.read!==0&&(q=0,R=q<e.read?e.read-q-1:e.end-q);if(R===0){e.write=q,S=e.inflate_flush(E,S),q=e.write,R=q<e.read?e.read-q-1:e.end-q,q==e.end&&e.read!==0&&(q=0,R=q<e.read?e.read-q-1:e.end-q);if(R===0)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S)}}S=n,e.window[q++]=c,R--,t=x;break;case O:j>7&&(j-=8,I++,F--),e.write=q,S=e.inflate_flush(E,S),q=e.write,R=q<e.read?e.read-q-1:e.end-q;if(e.read!=e.write)return e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);t=M;case M:return S=r,e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);case _:return S=o,e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S);default:return S=s,e.bitb=B,e.bitk=j,E.avail_in=I,E.total_in+=F-E.next_in_index,E.next_in_index=F,e.write=q,e.inflate_flush(E,S)}},e.free=function(){}}function X(e,t){var i=this,u=H,c=0,h=0,p=0,d,v=[0],m=[0],g=new D,y=0,b=new Int32Array(l*3),w=0,E=new S;i.bitk=0,i.bitb=0,i.window=new Uint8Array(t),i.end=t,i.read=0,i.write=0,i.reset=function(e,t){t&&(t[0]=w),u==R&&g.free(e),u=H,i.bitk=0,i.bitb=0,i.read=i.write=0},i.reset(e,null),i.inflate_flush=function(e,t){var r,s,o;return s=e.next_out_index,o=i.read,r=(o<=i.write?i.write:i.end)-o,r>e.avail_out&&(r=e.avail_out),r!==0&&t==a&&(t=n),e.avail_out-=r,e.total_out+=r,e.next_out.set(i.window.subarray(o,o+r),s),s+=r,o+=r,o==i.end&&(o=0,i.write==i.end&&(i.write=0),r=i.write-o,r>e.avail_out&&(r=e.avail_out),r!==0&&t==a&&(t=n),e.avail_out-=r,e.total_out+=r,e.next_out.set(i.window.subarray(o,o+r),s),s+=r,o+=r),e.next_out_index=s,i.read=o,t},i.proc=function(e,t){var a,l,w,x,T,N,C,k;x=e.next_in_index,T=e.avail_in,l=i.bitb,w=i.bitk,N=i.write,C=N<i.read?i.read-N-1:i.end-N;for(;;)switch(u){case H:while(w<3){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}a=l&7,y=a&1;switch(a>>>1){case 0:l>>>=3,w-=3,a=w&7,l>>>=a,w-=a,u=B;break;case 1:var L=[],A=[],O=[[]],M=[[]];S.inflate_trees_fixed(L,A,O,M),g.init(L[0],A[0],O[0],0,M[0],0),l>>>=3,w-=3,u=R;break;case 2:l>>>=3,w-=3,u=F;break;case 3:return l>>>=3,w-=3,u=W,e.msg="invalid block type",t=o,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t)}break;case B:while(w<32){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}if((~l>>>16&65535)!=(l&65535))return u=W,e.msg="invalid stored block lengths",t=o,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);c=l&65535,l=w=0,u=c!==0?j:y!==0?U:H;break;case j:if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);if(C===0){N==i.end&&i.read!==0&&(N=0,C=N<i.read?i.read-N-1:i.end-N);if(C===0){i.write=N,t=i.inflate_flush(e,t),N=i.write,C=N<i.read?i.read-N-1:i.end-N,N==i.end&&i.read!==0&&(N=0,C=N<i.read?i.read-N-1:i.end-N);if(C===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t)}}t=n,a=c,a>T&&(a=T),a>C&&(a=C),i.window.set(e.read_buf(x,a),N),x+=a,T-=a,N+=a,C-=a;if((c-=a)!==0)break;u=y!==0?U:H;break;case F:while(w<14){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}h=a=l&16383;if((a&31)>29||(a>>5&31)>29)return u=W,e.msg="too many length or distance symbols",t=o,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);a=258+(a&31)+(a>>5&31);if(!d||d.length<a)d=[];else for(k=0;k<a;k++)d[k]=0;l>>>=14,w-=14,p=0,u=I;case I:while(p<4+(h>>>10)){while(w<3){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}d[P[p++]]=l&7,l>>>=3,w-=3}while(p<19)d[P[p++]]=0;v[0]=7,a=E.inflate_trees_bits(d,v,m,b,e);if(a!=n)return t=a,t==o&&(d=null,u=W),i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);p=0,u=q;case q:for(;;){a=h;if(!(p<258+(a&31)+(a>>5&31)))break;var _,D;a=v[0];while(w<a){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}a=b[(m[0]+(l&f[a]))*3+1],D=b[(m[0]+(l&f[a]))*3+2];if(D<16)l>>>=a,w-=a,d[p++]=D;else{k=D==18?7:D-14,_=D==18?11:3;while(w<a+k){if(T===0)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);t=n,T--,l|=(e.read_byte(x++)&255)<<w,w+=8}l>>>=a,w-=a,_+=l&f[k],l>>>=k,w-=k,k=p,a=h;if(k+_>258+(a&31)+(a>>5&31)||D==16&&k<1)return d=null,u=W,e.msg="invalid bit length repeat",t=o,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);D=D==16?d[k-1]:0;do d[k++]=D;while(--_!==0);p=k}}m[0]=-1;var X=[],V=[],$=[],J=[];X[0]=9,V[0]=6,a=h,a=E.inflate_trees_dynamic(257+(a&31),1+(a>>5&31),d,X,V,$,J,b,e);if(a!=n)return a==o&&(d=null,u=W),t=a,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);g.init(X[0],V[0],b,$[0],b,J[0]),u=R;case R:i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N;if((t=g.proc(i,e,t))!=r)return i.inflate_flush(e,t);t=n,g.free(e),x=e.next_in_index,T=e.avail_in,l=i.bitb,w=i.bitk,N=i.write,C=N<i.read?i.read-N-1:i.end-N;if(y===0){u=H;break}u=U;case U:i.write=N,t=i.inflate_flush(e,t),N=i.write,C=N<i.read?i.read-N-1:i.end-N;if(i.read!=i.write)return i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);u=z;case z:return t=r,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);case W:return t=o,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t);default:return t=s,i.bitb=l,i.bitk=w,e.avail_in=T,e.total_in+=x-e.next_in_index,e.next_in_index=x,i.write=N,i.inflate_flush(e,t)}},i.free=function(e){i.reset(e,null),i.window=null,b=null},i.set_dictionary=function(e,t,n){i.window.set(e.subarray(t,t+n),0),i.read=i.write=n},i.sync_point=function(){return u==B?1:0}}function st(){function t(e){return!e||!e.istate?s:(e.total_in=e.total_out=0,e.msg=null,e.istate.mode=tt,e.istate.blocks.reset(e,null),n)}var e=this;e.mode=0,e.method=0,e.was=[0],e.need=0,e.marker=0,e.wbits=0,e.inflateEnd=function(t){return e.blocks&&e.blocks.free(t),e.blocks=null,n},e.inflateInit=function(r,i){return r.msg=null,e.blocks=null,i<8||i>15?(e.inflateEnd(r),s):(e.wbits=i,r.istate.blocks=new X(r,1<<i),t(r),n)},e.inflate=function(e,t){var u,f;if(!e||!e.istate||!e.next_in)return s;t=t==h?a:n,u=a;for(;;)switch(e.istate.mode){case J:if(e.avail_in===0)return u;u=t,e.avail_in--,e.total_in++;if(((e.istate.method=e.read_byte(e.next_in_index++))&15)!=$){e.istate.mode=rt,e.msg="unknown compression method",e.istate.marker=5;break}if((e.istate.method>>4)+8>e.istate.wbits){e.istate.mode=rt,e.msg="invalid window size",e.istate.marker=5;break}e.istate.mode=K;case K:if(e.avail_in===0)return u;u=t,e.avail_in--,e.total_in++,f=e.read_byte(e.next_in_index++)&255;if(((e.istate.method<<8)+f)%31!==0){e.istate.mode=rt,e.msg="incorrect header check",e.istate.marker=5;break}if((f&V)===0){e.istate.mode=tt;break}e.istate.mode=Q;case Q:if(e.avail_in===0)return u;u=t,e.avail_in--,e.total_in++,e.istate.need=(e.read_byte(e.next_in_index++)&255)<<24&4278190080,e.istate.mode=G;case G:if(e.avail_in===0)return u;u=t,e.avail_in--,e.total_in++,e.istate.need+=(e.read_byte(e.next_in_index++)&255)<<16&16711680,e.istate.mode=Y;case Y:if(e.avail_in===0)return u;u=t,e.avail_in--,e.total_in++,e.istate.need+=(e.read_byte(e.next_in_index++)&255)<<8&65280,e.istate.mode=Z;case Z:if(e.avail_in===0)return u;return u=t,e.avail_in--,e.total_in++,e.istate.need+=e.read_byte(e.next_in_index++)&255,e.istate.mode=et,i;case et:return e.istate.mode=rt,e.msg="need dictionary",e.istate.marker=0,s;case tt:u=e.istate.blocks.proc(e,u);if(u==o){e.istate.mode=rt,e.istate.marker=0;break}u==n&&(u=t);if(u!=r)return u;u=t,e.istate.blocks.reset(e,e.istate.was),e.istate.mode=nt;case nt:return r;case rt:return o;default:return s}},e.inflateSetDictionary=function(e,t,r){var i=0,o=r;return!e||!e.istate||e.istate.mode!=et?s:(o>=1<<e.istate.wbits&&(o=(1<<e.istate.wbits)-1,i=r-o),e.istate.blocks.set_dictionary(t,i,o),e.istate.mode=tt,n)},e.inflateSync=function(e){var r,i,u,f,l;if(!e||!e.istate)return s;e.istate.mode!=rt&&(e.istate.mode=rt,e.istate.marker=0);if((r=e.avail_in)===0)return a;i=e.next_in_index,u=e.istate.marker;while(r!==0&&u<4)e.read_byte(i)==it[u]?u++:e.read_byte(i)!==0?u=0:u=4-u,i++,r--;return e.total_in+=i-e.next_in_index,e.next_in_index=i,e.avail_in=r,e.istate.marker=u,u!=4?o:(f=e.total_in,l=e.total_out,t(e),e.total_in=f,e.total_out=l,e.istate.mode=tt,n)},e.inflateSyncPoint=function(e){return!e||!e.istate||!e.istate.blocks?s:e.istate.blocks.sync_point()}}function ot(){}function ut(){var e=this,t=new ot,i=512,s=c,o=new Uint8Array(i),u=!1;t.inflateInit(),t.next_out=o,e.append=function(e,f){var l,c=[],h=0,p=0,d=0,v;if(e.length===0)return;t.next_in_index=0,t.next_in=e,t.avail_in=e.length;do{t.next_out_index=0,t.avail_out=i,t.avail_in===0&&!u&&(t.next_in_index=0,u=!0),l=t.inflate(s);if(u&&l==a)return-1;if(l!=n&&l!=r)throw"inflating: "+t.msg;if(!(!u&&l!=r||t.avail_in!=e.length))return-1;t.next_out_index&&(t.next_out_index==i?c.push(new Uint8Array(o)):c.push(new Uint8Array(o.subarray(0,t.next_out_index)))),d+=t.next_out_index,f&&t.next_in_index>0&&t.next_in_index!=h&&(f(t.next_in_index),h=t.next_in_index)}while(t.avail_in>0||t.avail_out===0);return v=new Uint8Array(d),c.forEach(function(e){v.set(e,p),p+=e.length}),v},e.flush=function(){t.inflateEnd()}}var t=15,n=0,r=1,i=2,s=-2,o=-3,u=-4,a=-5,f=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],l=1440,c=0,h=4,p=9,d=5,v=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],m=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],g=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],b=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],w=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],E=15;S.inflate_trees_fixed=function(e,t,r,i){return e[0]=p,t[0]=d,r[0]=v,i[0]=m,n};var x=0,T=1,N=2,C=3,k=4,L=5,A=6,O=7,M=8,_=9,P=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],H=0,B=1,j=2,F=3,I=4,q=5,R=6,U=7,z=8,W=9,V=32,$=8,J=0,K=1,Q=2,G=3,Y=4,Z=5,et=6,tt=7,nt=12,rt=13,it=[0,0,255,255];ot.prototype={inflateInit:function(e){var n=this;return n.istate=new st,e||(e=t),n.istate.inflateInit(n,e)},inflate:function(e){var t=this;return t.istate?t.istate.inflate(t,e):s},inflateEnd:function(){var e=this;if(!e.istate)return s;var t=e.istate.inflateEnd(e);return e.istate=null,t},inflateSync:function(){var e=this;return e.istate?e.istate.inflateSync(e):s},inflateSetDictionary:function(e,t){var n=this;return n.istate?n.istate.inflateSetDictionary(n,e,t):s},read_byte:function(e){var t=this;return t.next_in.subarray(e,e+1)[0]},read_buf:function(e,t){var n=this;return n.next_in.subarray(e,e+t)}};var at;e.zip?e.zip.Inflater=ut:(at=new ut,e.addEventListener("message",function(t){var n=t.data;n.append&&e.postMessage({onappend:!0,data:at.append(n.data,function(t){e.postMessage({progress:!0,current:t})})}),n.flush&&(at.flush(),e.postMessage({onflush:!0}))},!1))})(this);