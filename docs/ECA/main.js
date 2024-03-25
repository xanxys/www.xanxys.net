(function() {
  var Color, Field, Timer, World, canvas, config, ctx, decorate_ui, draw, dt, dx, expand_config, expand_rule, expand_term, fetch_scale_config, fetch_sim_config, init_val, logic_and3, logic_buf, logic_or2, nt, nx, p_period, p_wavelength, quantize2, quantize3, refresh, rule, saturate2, saturate3, st, step, sx, table_update, tc, w, w_desc;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Timer = (function() {
    function Timer(f, dur) {
      var cb;
      this.in_exec = false;
      cb = __bind(function() {
        if (!this.in_exec) {
          try {
            this.in_exec = true;
            f();
            return this.in_exec = false;
          } catch (err) {
            this.in_exec = false;
            throw err;
          }
        }
      }, this);
      setInterval(cb, dur * 1000);
    }
    return Timer;
  })();
  Color = (function() {
    function Color(x, y, z, ty) {
      var f, h, i, p, q, s, t, v, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
      if (ty == null) {
        ty = 'rgb';
      }
      switch (ty) {
        case 'rgb':
          _ref = [x, y, z], this.r = _ref[0], this.g = _ref[1], this.b = _ref[2];
          break;
        case 'hsv':
          _ref2 = [x, y, z], h = _ref2[0], s = _ref2[1], v = _ref2[2];
          i = Math.floor(h * 6);
          f = h * 6 - i;
          p = v * (1 - s);
          q = v * (1 - s * f);
          t = v * (1 - s * (1 - f));
          switch (i) {
            case 0:
              _ref3 = [v, t, p], this.r = _ref3[0], this.g = _ref3[1], this.b = _ref3[2];
              break;
            case 1:
              _ref4 = [q, v, p], this.r = _ref4[0], this.g = _ref4[1], this.b = _ref4[2];
              break;
            case 2:
              _ref5 = [p, v, t], this.r = _ref5[0], this.g = _ref5[1], this.b = _ref5[2];
              break;
            case 3:
              _ref6 = [p, q, v], this.r = _ref6[0], this.g = _ref6[1], this.b = _ref6[2];
              break;
            case 4:
              _ref7 = [t, p, v], this.r = _ref7[0], this.g = _ref7[1], this.b = _ref7[2];
              break;
            case 5:
              _ref8 = [v, p, q], this.r = _ref8[0], this.g = _ref8[1], this.b = _ref8[2];
          }
      }
    }
    Color.prototype.add = function(c) {
      return new Color(this.r + c.r, this.g + c.g, this.b + c.b);
    };
    Color.prototype.scale = function(k) {
      return new Color(this.r * k, this.g * k, this.b * k);
    };
    Color.prototype.clip = function() {
      var f;
      f = function(v) {
        return Math.max(0, Math.min(1, v));
      };
      return new Color(f(this.r), f(this.g), f(this.b));
    };
    Color.prototype.floor = function() {
      return new Color(Math.floor(this.r), Math.floor(this.g), Math.floor(this.b));
    };
    Color.prototype.toCSS = function() {
      var o;
      o = this.clip().scale(255).floor();
      return "rgb(" + o.r + "," + o.g + "," + o.b + ")";
    };
    return Color;
  })();
  Field = (function() {
    function Field(max_order, f_init, f_step) {
      var x;
      this.max_order = max_order;
      this.f_step = f_step;
      this.stcon = new Float64Array(nx * nt);
      this.deriv = new Float64Array(nx * this.max_order);
      x = 0;
      while (x < nx) {
        this.stcon[x] = f_init(x);
        x++;
      }
    }
    Field.prototype.derive_at = function(t) {
      var curr, d, i, prev, u, un;
      u = this.stcon.subarray(t * nx, (t + 1) * nx);
      un = this.stcon.subarray((t + 1) * nx, (t + 2) * nx);
      d = 0;
      while (d < this.max_order) {
        prev = d === 0 ? u : this.deriv.subarray((d - 1) * nx, d * nx);
        curr = this.deriv.subarray(d * nx, (d + 1) * nx);
        i = 0;
        while (i < nx - 1) {
          curr[i] = (prev[i + 1] - prev[i]) / dx;
          i++;
        }
        curr[nx - 1] = (prev[0] - prev[nx - 1]) / dx;
        d++;
      }
      return __bind(function(x, order) {
        var ib;
        if (order === 0) {
          return u[x];
        } else {
          ib = Math.floor(order / 2);
          if (order % 2 === 0) {
            return this.deriv[(order - 1) * nx + (x + nx - ib) % nx];
          } else {
            return (this.deriv[(order - 1) * nx + (x + nx - ib) % nx] + this.deriv[(order - 1) * nx + (x + nx - ib - 1) % nx]) / 2;
          }
        }
      }, this);
    };
    Field.prototype.integrate_at = function(t, dudt) {
      var u, un, x;
      u = this.stcon.subarray(t * nx, (t + 1) * nx);
      un = this.stcon.subarray((t + 1) * nx, (t + 2) * nx);
      x = 0;
      while (x < nx) {
        un[x] = u[x] + dt * dudt(x);
        x++;
      }
      return function(i) {
        return un[i];
      };
    };
    Field.prototype.update_at = function(t, u) {
      var un, x;
      un = this.stcon.subarray((t + 1) * nx, (t + 2) * nx);
      x = 0;
      while (x < nx) {
        un[x] = u(x);
        x++;
      }
      return function(i) {
        return un[i];
      };
    };
    return Field;
  })();
  World = (function() {
    function World(fdesc) {
      var d, n, ref, rs0, stc, _i, _len, _ref, _ref2;
      this.fin_order = fdesc.fin_order;
      this.fs = {};
      rs0 = {};
      _ref = fdesc.fields;
      for (n in _ref) {
        d = _ref[n];
        if (!d.instant) {
          this.fs[n] = new Field(d.order, d.init, d.step);
          this.fs[n].instant = false;
          stc = this.fs[n].stcon;
          rs0[n] = __bind(function(x) {
            return stc[x];
          }, this);
        }
      }
      _ref2 = this.fin_order;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        n = _ref2[_i];
        d = fdesc.fields[n];
        this.fs[n] = new Field(d.order, (__bind(function(x) {
          return d.calc(rs0, x, 0);
        }, this)), null);
        this.fs[n].instant = true;
        this.fs[n].calc = d.calc;
        stc = this.fs[n].stcon;
        ref = __bind(function(x) {
          return stc[x];
        }, this);
        rs0[n] = ref;
      }
    }
    World.prototype.integrate_at = function(t) {
      var f, n, rs, rs0, _i, _len, _ref, _ref2, _ref3, _results;
      rs = {};
      _ref = this.fs;
      for (n in _ref) {
        f = _ref[n];
        rs[n] = f.derive_at(t);
      }
      rs0 = {};
      _ref2 = this.fs;
      for (n in _ref2) {
        f = _ref2[n];
        if (!f.instant) {
          rs0[n] = f.integrate_at(t, (function(x) {
            return f.f_step(rs, x);
          }));
        }
      }
      _ref3 = this.fin_order;
      _results = [];
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        n = _ref3[_i];
        f = this.fs[n];
        _results.push(rs0[n] = f.update_at(t, (function(x) {
          return f.calc(rs0, x, t);
        })));
      }
      return _results;
    };
    return World;
  })();
  saturate2 = function(x) {
    return -1 + 2 / (1 + Math.exp(-3 * x));
  };
  quantize2 = function(x) {
    return (saturate2(x)) - x;
  };
  saturate3 = function(x) {
    return -1 + 2 / (1 + Math.exp(-3 * Math.pow(x, 3)));
  };
  quantize3 = function(x) {
    return (saturate3(x)) - x;
  };
  logic_buf = function(x) {
    return -1 + 2 / (1 + Math.exp(-30 * x));
  };
  logic_or2 = function(x, y) {
    return logic_buf((logic_buf(x)) + (logic_buf(y)) + 1);
  };
  logic_and3 = function(x, y, z) {
    return logic_buf((logic_buf(x)) + (logic_buf(y)) + (logic_buf(z)) - 2);
  };
  expand_term = function(p) {
    return function(i) {
      var x, y, z;
      x = p & 1 ? i.trl : -i.trl;
      y = p & 2 ? i.trf : -i.trf;
      z = p & 4 ? i.trr : -i.trr;
      return logic_and3(x, y, z);
    };
  };
  expand_rule = function(n) {
    var pat, term, ts;
    pat = 0;
    ts = (function() {
      var _results;
      _results = [];
      while (pat < 8) {
        term = n & 1 ? expand_term(pat) : function(i) {
          return -1;
        };
        n >>= 1;
        pat++;
        _results.push(term);
      }
      return _results;
    })();
    return function(i) {
      var s0, s1, t0, t1, t2, t3;
      t0 = logic_or2(ts[0](i), ts[1](i));
      t1 = logic_or2(ts[2](i), ts[3](i));
      t2 = logic_or2(ts[4](i), ts[5](i));
      t3 = logic_or2(ts[6](i), ts[7](i));
      s0 = logic_or2(t0, t1);
      s1 = logic_or2(t2, t3);
      return logic_buf(logic_or2(s0, s1));
    };
  };
  expand_config = function(s) {
    var c, i, _results;
    i = 0;
    _results = [];
    while (i < s.length) {
      c = (function() {
        switch (s.charAt(i)) {
          case '-':
            return -1;
          case '+':
            return 1;
          default:
            return 0;
        }
      })();
      i++;
      _results.push(c);
    }
    return _results;
  };
  p_wavelength = 12;
  p_period = 1.5;
  init_val = function(cfg) {
    return function(ix) {
      var a, k, l, v;
      k = 2 * Math.PI / p_wavelength;
      a = Math.floor(ix * dx / (p_wavelength * 0.5));
      v = a < cfg.length ? cfg[a] : -1;
      l = Math.pow(Math.sin(k * ix * dx), 4);
      return v * l;
    };
  };
  w_desc = {
    fin_order: ['lat', 'latm', 'rapp'],
    fields: {
      lat: {
        instant: true,
        order: 0,
        comm: 'current value lattice',
        calc: function(r, ix, it) {
          var k, w;
          k = 2 * Math.PI / p_wavelength;
          w = 2 * Math.PI / p_period;
          return Math.pow((Math.sin(k * ix * dx)) * (Math.cos(w * it * dt)), 4);
        }
      },
      latm: {
        instant: true,
        order: 0,
        comm: 'previous value lattice',
        calc: function(r, ix, it) {
          var k, w;
          k = 2 * Math.PI / p_wavelength;
          w = 2 * Math.PI / p_period;
          return Math.pow((Math.sin(k * ix * dx)) * (Math.cos(0.3 * Math.PI + w * it * dt)), 4);
        }
      },
      vdiff: {
        instant: false,
        order: 2,
        comm: 'value field',
        init: function(x) {
          return (init_val(config))(x);
        },
        step: function(r, x) {
          var alpha, beta, il, ilm, ol;
          ilm = 5 * (quantize2(r.vdiff(x, 0))) + 2 * (r.vdiff(x, 2)) + 5 * (r.rapp(x, 0));
          il = 15 * (quantize2(r.vdiff(x, 0))) + 2 * (r.vdiff(x, 2));
          ol = -10 * (r.vdiff(x, 0));
          alpha = r.latm(x, 0);
          beta = r.lat(x, 0);
          return alpha * ilm + beta * il + (1 - alpha - beta) * ol;
        }
      },
      trf: {
        instant: false,
        order: 2,
        comm: 'forward transport field',
        init: function(x) {
          return 0;
        },
        step: function(r, x) {
          var alpha, beta, il, ilm, ol;
          ilm = -0.5 * (r.trf(x, 0));
          il = 8 * ((r.vdiff(x, 0)) - (r.trf(x, 0)));
          ol = 2 * (quantize3(0.8 * (r.trf(x, 0)))) + 0.5 * (r.trf(x, 2));
          alpha = r.latm(x, 0);
          beta = r.lat(x, 0);
          return alpha * ilm + beta * il + (1 - alpha - beta) * ol;
        }
      },
      trr: {
        instant: false,
        order: 2,
        comm: 'right transport field',
        init: function(x) {
          return 0;
        },
        step: function(r, x) {
          var alpha, beta, il, ilm, ol;
          ilm = -0.5 * (r.trr(x, 0));
          il = 8 * ((r.vdiff(x, 0)) - (r.trr(x, 0)));
          ol = 1.5 * (quantize3(0.5 * (r.trr(x, 0)))) - 14 * (r.trr(x, 1)) + 0.7 * (r.trr(x, 2));
          alpha = r.latm(x, 0);
          beta = r.lat(x, 0);
          return alpha * ilm + beta * il + (1 - alpha - beta) * ol;
        }
      },
      trl: {
        instant: false,
        order: 2,
        comm: 'left transport field',
        init: function(x) {
          return 0;
        },
        step: function(r, x) {
          var alpha, beta, il, ilm, ol;
          ilm = -0.5 * (r.trl(x, 0));
          il = 8 * ((r.vdiff(x, 0)) - (r.trl(x, 0)));
          ol = 1.5 * (quantize3(0.5 * (r.trl(x, 0)))) + 14 * (r.trl(x, 1)) + 0.7 * (r.trl(x, 2));
          alpha = r.latm(x, 0);
          beta = r.lat(x, 0);
          return alpha * ilm + beta * il + (1 - alpha - beta) * ol;
        }
      },
      rapp: {
        instant: true,
        order: 0,
        comm: 'rule application',
        calc: function(r, x, t) {
          return rule({
            trr: r.trr(x),
            trf: r.trf(x),
            trl: r.trl(x)
          });
        }
      }
    }
  };
  table_update = function(w_desc) {
    var fd, grp, n, row, ui, _ref, _results;
    _ref = w_desc.fields;
    _results = [];
    for (n in _ref) {
      fd = _ref[n];
      row = $('<tr/>');
      row.append($('<td/>').text(fd.comm));
      row.append($('<td/>').text(fd.order));
      row.append($('<td/>').text(fd.instant));
      ui = $('<td/>');
      grp = $('<div class="rgroup"/>');
      grp.append($('<input type="radio" name="g_' + n + '" id="show_' + n + '" checked="checked"/>').text('hide'));
      grp.append($('<input type="radio" name="g_' + n + '" id="show_s_' + n + '"/>').text('simple'));
      grp.append($('<input type="radio" name="g_' + n + '" id="show_d_' + n + '"/>').text('detail'));
      ui.append(grp);
      row.append(ui);
      _results.push($('#table_fields').append(row));
    }
    return _results;
  };
  decorate_ui = function() {
    $('input[type="range"]').after(function() {
      return $('<span/>').text(this.value);
    });
    return $('input[type="range"]').change(function(ev) {
      return this.nextElementSibling.innerText = ev.srcElement.value;
    });
  };
  decorate_ui();
  table_update(w_desc);
  canvas = $('#main')[0];
  ctx = canvas.getContext('2d');
  dx = void 0;
  dt = void 0;
  nx = void 0;
  nt = void 0;
  rule = void 0;
  config = void 0;
  fetch_sim_config = function() {
    var cyc, nxc, size;
    nxc = parseFloat($('#r_nxc')[0].value);
    size = parseInt($('#r_size')[0].value);
    dx = (p_wavelength * 0.5) / nxc;
    nx = size * nxc;
    dt = parseFloat($('#r_dt')[0].value);
    cyc = parseInt($('#r_cyc')[0].value);
    nt = Math.ceil((p_period * 0.5) * cyc / dt);
    rule = expand_rule($('#r_rule')[0].value);
    return config = expand_config($('#r_config')[0].value);
  };
  sx = void 0;
  st = void 0;
  fetch_scale_config = function() {
    sx = parseInt($('#r_sx')[0].value);
    st = parseInt($('#r_st')[0].value);
    canvas.width = Math.floor(nx / sx);
    return canvas.height = Math.floor(nt / st);
  };
  fetch_sim_config();
  fetch_scale_config();
  tc = 0;
  w = new World(w_desc);
  draw = function(draw_all) {
    var c_detail, c_simple, csum, cx, f, fs, kcol, n, ni, ns, nsum, row, t, t0, t1, x, x0, x1, y0, y1, _ref, _ref2, _results;
    if (draw_all == null) {
      draw_all = false;
    }
    ctx.lineWidth = 0;
    c_simple = function(h) {
      return function(v) {
        var x;
        x = 2 * Math.pow(v, 2);
        return (new Color(h, 0.8, x, 'hsv')).clip();
      };
    };
    c_detail = function(v) {
      return (new Color(v * 0.9, 0.5 + 0.5 * Math.log(Math.abs(v)), -v * 0.9)).clip();
    };
    ns = 0;
    _ref = w.fs;
    for (n in _ref) {
      f = _ref[n];
      ns++;
    }
    nsum = 0;
    ni = 0;
    fs = {};
    _ref2 = w.fs;
    for (n in _ref2) {
      f = _ref2[n];
      if ($("#show_s_" + n)[0].checked) {
        fs[n] = {
          field: f,
          scheme: c_simple(ni / ns)
        };
        nsum++;
      }
      if ($("#show_d_" + n)[0].checked) {
        fs[n] = {
          field: f,
          scheme: c_detail
        };
        nsum++;
      }
      ni++;
    }
    kcol = nsum === 0 ? 1 : 1 / Math.sqrt(nsum);
    t0 = draw_all ? 0 : Math.max(0, tc - 3);
    t1 = tc;
    y0 = Math.floor(t0 / st);
    y1 = Math.floor(t1 / st);
    _results = [];
    while (y0 < y1) {
      t = y0 * st;
      row = ctx.getImageData(0, y0, canvas.width, 1);
      x0 = 0;
      x1 = Math.floor(nx / sx);
      while (x0 < x1) {
        csum = new Color(0, 0, 0);
        x = x0 * sx;
        for (n in fs) {
          f = fs[n];
          csum = csum.add(f.scheme(f.field.stcon[nx * t + x]));
        }
        cx = csum.scale(kcol);
        cx = cx.clip().scale(255).floor();
        row.data[x0 * 4 + 0] = cx.r;
        row.data[x0 * 4 + 1] = cx.g;
        row.data[x0 * 4 + 2] = cx.b;
        row.data[x0 * 4 + 3] = 255;
        x0++;
      }
      ctx.putImageData(row, 0, y0);
      _results.push(y0++);
    }
    return _results;
  };
  $('#btn_res').click(function() {
    fetch_sim_config();
    fetch_scale_config();
    tc = 0;
    return w = new World(w_desc);
  });
  $('#btn_redraw').click(function() {
    fetch_scale_config();
    return draw(true);
  });
  $('#btn_save').click(function() {
    return window.open(canvas.toDataURL('image/png'));
  });
  step = function() {
    var i, _results;
    i = 0;
    _results = [];
    while (i < 3) {
      if (tc < nt - 1) {
        w.integrate_at(tc);
        tc++;
      }
      _results.push(i++);
    }
    return _results;
  };
  refresh = function() {
    step();
    if (tc < nt - 1) {
      return draw(false);
    }
  };
  new Timer(refresh, 0.05);
}).call(this);
