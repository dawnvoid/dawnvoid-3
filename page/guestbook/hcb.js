var comments = {
  debug: {},
  comments: [
    {
      comment: "another comment",
      is_reply: false,
      image_path: null,
      key: "16002606",
      author: "dawn (mod)",
      date: 1658874092.0,
      replies_to_id: "",
      approved: true,
      likes: 0,
    },
    {
      comment: "@dawn, what",
      is_reply: true,
      image_path: null,
      key: "16002605",
      author: "dawn (mod)",
      date: 1658873972.0,
      replies_to_id: "16002580",
      approved: true,
      likes: 0,
    },
    {
      comment: "This is a test comment\r<br/>multiple lines!",
      is_reply: false,
      image_path: null,
      key: "16002580",
      author: "dawn (mod)",
      date: 1658871257.0,
      replies_to_id: "",
      replies: [
        {
          comment: "@dawn, what",
          is_reply: true,
          image_path: null,
          key: "16002605",
          author: "dawn (mod)",
          date: 1658873972.0,
          replies_to_id: "16002580",
          approved: true,
          likes: 0,
        },
      ],
      approved: true,
      likes: 0,
    },
  ],
}["comments"];
if (typeof hcb_user === "undefined") {
  hcb_user = {};
}
var extend = function (o1, o2) {
  for (var i in o2) {
    if (typeof o1[i] === "undefined") {
      o1[i] = o2[i];
    }
  }
  return o1;
};
hcb_user = extend(hcb_user, {
  comments_header: "Comments",
  name_label: "Name",
  content_label: "Enter your comment here",
  submit: "Comment",
  logout_link:
    '<img title="log out" src="https://www.htmlcommentbox.com/static/images/door_out.svg" alt="[logout]" class="hcb-icon hcb-door-out"/>',
  admin_link:
    '<img src="https://www.htmlcommentbox.com/static/images/door_in.svg" alt="[login]" class="hcb-icon hcb-door-in"/>',
  no_comments_msg: "No one has commented yet. Be the first!",
  add: "Add your comment",
  again: "Post another comment",
  rss: '<img src="https://www.htmlcommentbox.com/static/images/feed.svg" class="hcb-icon" alt="rss"/> ',
  said: "said:",
  prev_page:
    '<img src="https://www.htmlcommentbox.com/static/images/arrow_left.png" class="hcb-icon" title="previous page" alt="[prev]"/>',
  next_page:
    '<img src="https://www.htmlcommentbox.com/static/images/arrow_right.png" class="hcb-icon" title="next page" alt="[next]"/>',
  showing: "Showing",
  to: "to",
  website_label: "website (optional)",
  email_label: "email",
  anonymous: "Anonymous",
  mod_label: "(mod)",
  subscribe: "Email Me Replies",
  add_image: "Add Image",
  are_you_sure: "Do you want to flag this comment as inappropriate?",
  reply: "Reply",
  flag: "Flag",
  like: "Like",
  days_ago: "days ago",
  hours_ago: "hours ago",
  minutes_ago: "minutes ago",
  within_the_last_minute: "within the last minute",
  msg_thankyou: "Thank you for commenting!",
  msg_approval: "NOTE: This comment is not published until approved",
  msg_approval_required:
    "Thank you for commenting! Your comment will appear once approved by a moderator.",
  err_bad_html: "Your comment contained bad html.",
  err_bad_email: "Please enter a valid email address.",
  err_too_frequent: "You must wait a few seconds between posting comments.",
  err_comment_empty: "Your comment was not posted because it was empty!",
  err_denied: "Your comment was not accepted.",
  err_unknown:
    "Your comment was blocked for unknown reasons, please report this.",
  err_spam: "Your comment was detected as spam.",
  err_blocked: "Your comment was blocked by site policy.",
  MAX_CHARS: 8192,
  PAGE: "",
  ON_COMMENT: function () {},
  RELATIVE_DATES: true,
});
var OPTS = {
    opt_watermark: 256,
    opt_field_website: 1024,
    opt_date: 4,
    opt_field_email: 512,
    opt_top: 2,
    opt_sub: 8,
    opt_collapse: 1,
    opt_rss: 128,
    opt_site: 32,
    opt_gravatar: 64,
    opt_email_required: 4096,
    opt_querystring: 2048,
    opt_pfilter: 16,
    opt_stop: 8192,
    opt_replies: 16384,
  },
  opts = 16798,
  likes = false,
  pagenum = 0,
  host = "https://www.htmlcommentbox.com",
  msg = "",
  mod = "$1$wq1rdBcg$./H9glyYZGZP2iu0XpZ8h/",
  user = {
    name: "dawn",
    email: "voiding.voided@gmail.com",
    is_mod: true,
    subscribed: false,
  },
  opt_suspicious_policy = "approve",
  removed_backlink = false,
  auth_link =
    "https://www.htmlcommentbox.com/logout?then=http://127.0.0.1:5500/page/guestbook/guestbook.html",
  page_link =
    "https://www.htmlcommentbox.com/jread?page=http%3A%2F%2F127.0.0.1%3A5500%2Fpage%2Fguestbook%2Fguestbook.html&mod=%241%24wq1rdBcg%24.%2FH9glyYZGZP2iu0XpZ8h%2F&opts=16798&num=10&ts=1658870819546",
  pagination = "",
  gravatar_url = "97fae96a1a4cb3a1f2bb768509df6e98",
  image_policy = "allow",
  opt_thread_comments = false,
  opt_ignore_qs = "false";
var hcb = {};
(function () {
  var page = hcb_user.PAGE || (window.location + "").replace(/\'/g, "%27");
  var get_option = function (name) {
      return opts & OPTS["opt_" + name];
    },
    _hcb = hcb,
    _hcb_user = hcb_user,
    _document = document,
    collapsed_link = function () {
      if (!_hcb_user.again) return "";
      if (posted) {
        return (
          '<button class="btn btn-secondary" onclick="javascript:hcb.make_comment_form()">' +
          _hcb_user.again +
          "</button>"
        );
      } else {
        return (
          '<div id="HCB_comment_form_box"><button class="btn btn-secondary" onclick="javascript:hcb.make_comment_form()">' +
          _hcb_user.add +
          "</button></div>"
        );
      }
    },
    rss_link =
      '<a href="' +
      host +
      "/rss_clean?page=" +
      encodeURIComponent(page) +
      "&opts=" +
      opts +
      "&mod=" +
      mod +
      '" style="text-decoration:none"/>' +
      _hcb_user.rss +
      "</a>",
    shadow_start =
      '<div class="hcb-shadow-t"> <div class="hcb-shadow-tl"></div> <div class="hcb-shadow-tr"></div> </div> <div id="hcb_form_name_container" class="hcb-shadow-m">',
    shadow_end =
      '</div> <div class="hcb-shadow-b"> <div class="hcb-shadow-bl"></div> <div class="hcb-shadow-br"></div> </div><div class="hcb-shadow-clear"></div>',
    head = _document.getElementsByTagName("head")[0],
    is_tablet = function () {
      return navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
      );
    },
    clean_string = function (string) {
      return decodeURIComponent(encodeURIComponent(string));
    },
    get_element = function (id) {
      return (
        (_document.all && _document.all[id]) || _document.getElementById(id)
      );
    },
    remove_element = function (node) {
      if (node) node.parentNode.removeChild(node);
    },
    instr = function (haystack, needle) {
      return (haystack || "").indexOf(needle) !== -1;
    },
    insert_script = function (src) {
      s = _document.createElement("script");
      s.setAttribute("type", "text/javascript");
      s.setAttribute("src", src);
      head.appendChild(s);
    },
    textfield = function (name, value) {
      return (
        '<div class="hcb-wrapper-half input-field">' +
        shadow_start +
        '<input id="hcb_form_' +
        name +
        '" class="hcb-shadow-r" name="' +
        name +
        '" type="text" value="' +
        (value || "") +
        '" ' +
        (get_option("watermark")
          ? ' placeholder="' + _hcb_user[name + "_label"] + '">'
          : ">") +
        shadow_end +
        " </div>"
      );
    },
    hiddenfield = function (name, value) {
      return (
        '<input type="hidden" name="' +
        name +
        '" value="' +
        value +
        '" id="hcb_form_' +
        name +
        '" />'
      );
    },
    http_get = function (strURL, query) {
      insert_script(strURL + "?" + query);
    },
    xd_post = function (url, data) {
      var input,
        iframe = _document.createElement("iframe");
      var uniqueString = "" + Math.random();
      _document.body.appendChild(iframe);
      iframe.style.display = "none";
      iframe.contentWindow.name = uniqueString;
      var form = _document.createElement("form");
      form.target = uniqueString;
      form.action = url;
      form.acceptCharset = "utf-8";
      form.enctype = "multipart/form-data";
      form.method = "POST";
      form.style = "display:none";
      for (var item in data) {
        input = _document.createElement("input");
        input.type = item == "hcb_file" ? "file" : "hidden";
        input.style = "display:none";
        input.name = item;
        if (item === "hcb_file") {
          fileElement = _document.getElementById("hcb_file");
          input.files = fileElement.files;
        } else {
          input.value = data[item];
        }
        form.appendChild(input);
      }
      _document.body.appendChild(form);
      form.submit();
    },
    fields = ["email", "name", "website", "content"],
    by_class = function (elements, cls) {
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].className == cls) return elements[i];
      }
    },
    write_msg = function (msg) {
      get_element("hcb_msg").innerHTML = msg;
    },
    write_err = function (msg) {
      get_element("hcb_msg").className = "hcb-err";
      write_msg(msg);
    },
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    render_date = function (timestamp) {
      var now = new Date().valueOf() / 1000;
      var diff = now - timestamp;
      if (diff > 24 * 3600 * 7 || !_hcb_user.RELATIVE_DATES) {
        var d = new Date(timestamp * 1000);
        return (
          months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
        );
      }
      if (diff > 24 * 3600)
        return Math.floor(diff / (24 * 3600)) + " " + _hcb_user.days_ago;
      if (diff > 3600)
        return Math.floor(diff / 3600) + " " + _hcb_user.hours_ago;
      if (diff > 60) return Math.floor(diff / 60) + " " + _hcb_user.minutes_ago;
      return _hcb_user.within_the_last_minute;
    },
    get_charset = function () {
      return (
        _document.inputEncoding ||
        _document.characterSet ||
        _document.charset ||
        _document.defaultCharset ||
        "utf-8"
      );
    },
    stop = function () {
      return get_option("stop");
    },
    _render_comment = function (C) {
      h = "";
      if (user.is_mod) {
        h +=
          '<b class="hcb-link del" title="delete comment" onclick="hcb.del(\'' +
          C.key +
          '\')" ><img src="' +
          host +
          '/static/images/delete.png" class="hcb-icon" alt="[delete]" /></b>&nbsp;';
        if (!C.approved) {
          h +=
            '<b class="hcb-link del approval-msg" title="approve comment" onclick="hcb.approve(\'' +
            C.key +
            '\')" ><img src="' +
            host +
            '/static/images/accept.png" class="hcb-icon" alt="[approve]" /></b>&nbsp;';
        }
      }
      h +=
        "<blockquote>" +
        '<span class="author' +
        (instr(C.author, "(mod)") ? " hcb-mod" : "") +
        '"><b class="author-name">' +
        (C.website
          ? '<a rel="nofollow" target="_blank" href="' + C.website + '">'
          : "") +
        C.author.replace("(mod)", _hcb_user.mod_label) +
        (C.website ? "</a> " : " ") +
        (C.email ? '<i class="author-email">' + C.email + "</i>" : "") +
        "</b></span>";
      if (C.date)
        h += '<span class="date">&#183; ' + render_date(C.date) + "</span>";
      h +=
        '<p class="hcb-comment-body">' +
        (C.comment + " ").replace(
          /(https?:\/\/|)((?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\.|[a-z0-9]\.)+(?:[a-z]{2}|ASIA|BIZ|COM|COOP|EDU|GOV|INFO|JOBS|MOBI|NAME|NET|ORG|XXX))([\/#?][-A-Z0-9+&@#\/%?=~_|!:.;]*[-A-Z0-9+&@#\/%=~_|]|)([\s\.])/gi,
          function (match, protocol, site, path, delimiter) {
            return (
              "<a target='_blank' rel='nofollow' href='" +
              (protocol || "//") +
              site +
              path +
              "'>" +
              site +
              path +
              "</a>" +
              delimiter
            );
          }
        ) +
        "</p></blockquote>" +
        (C.image_path
          ? '<a href="' +
            host +
            C.image_path.replace("/storage/", "/storage/lg_") +
            '"><img src="' +
            host +
            C.image_path +
            '"></a>'
          : "");
      h += '<p class="hcb-comment-tb">';
      if (likes)
        h +=
          '<button class="hcb-like" onclick="javascript:hcb.like(\'' +
          C.key +
          "')\">" +
          _hcb_user.like +
          " &#183; </button>";
      if (get_option("replies"))
        h +=
          '<button class="hcb-reply" onclick="javascript:hcb.reply(\'' +
          C.key +
          "')\">" +
          _hcb_user.reply +
          " &#183; </button>";
      h +=
        '<button class="hcb-flag" onclick="javascript:hcb.flag(\'' +
        C.key +
        "')\">" +
        _hcb_user.flag +
        "</button> ";
      h += "</p>";
      if (likes)
        h +=
          '<div class="likes" ' +
          (C.likes ? "" : 'style="display:none"') +
          "><span>" +
          C.likes +
          ' </span><img src="' +
          host +
          '/static/images/like.png"/></div>';
      if (!C.approved)
        h += '<p class="approval-msg">' + _hcb_user.msg_approval + "</p>";
      by[C.key] = C.author;
      by[C.author] = C.key;
      if (opt_thread_comments) {
        var replies = C.replies;
        if (replies) {
          h += '<div id="replies_' + C.key + '">';
          for (var i = 0; i < replies.length; i++) {
            h += render_reply(replies[i]);
          }
          h += "</div>";
        }
      }
      return h;
    },
    render_reply = function (C) {
      return (
        '<div class="comment" id="comment_' +
        C.key +
        '" style="margin: 20px 0 20px 30px;">' +
        _render_comment(C) +
        "</div>"
      );
    },
    render_comment = function (C) {
      if (!opt_thread_comments) {
        h = '<div class="comment" id="comment_' + C.key + '">';
        h += _render_comment(C);
        return h + "</div>";
      } else {
        if (!C.is_reply) {
          h = '<div class="comment" id="comment_' + C.key + '">';
          h += _render_comment(C);
          return h + "</div>";
        } else {
          return "";
        }
      }
    },
    init = function () {
      var eventMethod = window.addEventListener
        ? "addEventListener"
        : "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
      eventer(
        messageEvent,
        function (e) {
          if (instr(e.origin + "/", host)) {
            if (e.data.success === false) {
              var submit_el = get_element("hcb_submit");
              submit_el.disabled = false;
              write_msg(eval("(" + e.data.msg + ")"));
            } else if (
              e.data.comments &&
              e.data.comments[0] &&
              e.data.comments[0].author
            ) {
              write_msg(_hcb_user.msg_thankyou);
              var _comment = e.data.comments[0];
              var is_reply = _comment.is_reply;
              if (!is_reply) {
                var cl = get_element("comments_list");
                cl.innerHTML = render_comment(_comment) + cl.innerHTML;
              } else {
                var cl = get_element("replies_" + _comment.replies_to_id);
                if (cl) {
                  cl.innerHTML = cl.innerHTML + render_reply(_comment);
                } else {
                  var pl = get_element("comment_" + _comment.replies_to_id);
                  var reply =
                    '<div id="replies_' + _comment.replies_to_id + '">';
                  reply += render_reply(_comment);
                  reply += "</div>";
                  sl = pl.parentNode;
                  if (sl.id === "comments_list") {
                    pl.innerHTML = pl.innerHTML + reply;
                  } else {
                    sl.innerHTML = sl.innerHTML + reply;
                  }
                }
              }
              remove_element(get_element("no_comments"));
              posted = true;
              get_element("HCB_comment_form_box").innerHTML = collapsed_link();
              hcb_user.ON_COMMENT();
            }
          }
        },
        false
      );
      var hcb_wrapper,
        i,
        C,
        p = (hcb_wrapper = get_element("HCB_comment_box"));
      while (p.parentNode && p.tagName !== "HTML") {
        p = p.parentNode;
        if (p.tagName === "FORM") {
          alert(
            "Warning: The HTML Comment Box code is inside a form element. Comments won't be submitted."
          );
        }
      }
      if (instr(page, "opensocial.googleusercontent")) {
        alert(
          "Warning: It looks like you are using HTML Comment Box with Google Sites but didn't specify the page before copying your code. Re-copy your code with the correct options from https://www.htmlcommentbox.com."
        );
      }
      width = hcb_wrapper.offsetWidth;
      var H = "#HCB_comment_box ";
      var h =
        "<h3>" +
        (_hcb_user.comments_header || "Comments") +
        "</h3>" +
        '<style type="text/css">' +
        '@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700");' +
        H +
        "#HCB_comment_form_box{padding-bottom:1em}" +
        H +
        ".hcb-link{cursor:pointer}" +
        H +
        ".hcb-icon{border:0px transparent none}" +
        H +
        "textarea {display:block;width:100%;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;width: 100%}" +
        H +
        "blockquote{margin:10px 0;overflow:hidden}" +
        H +
        ".hcb-err{color:red}" +
        H +
        ".hcb-comment-tb{margin:0}" +
        H +
        ".comment{position:relative}" +
        (get_option("stop") ? "HCB_comment_form_box{opacity:0.5}" : "") +
        H +
        ".comment .likes {position:absolute;top:0;right:0;}" +
        H +
        ".comment .likes img {vertical-align: unset;}" +
        H +
        ".comment:hover .hcb-comment-tb button{visibility:visible}" +
        H +
        '{font-family: "montserrat"; letter-spacing: 0.25; height: 100%; display: flex; flex-direction: column;}' +
        H +
        "#comments_list { flex: 1; overflow: auto; padding-right: 8px;}" +
        H +
        "h3 {margin-bottom: 8px;}" +
        H +
        ".comment {margin-bottom: 3em;}" +
        H +
        ".comment {margin-bottom: 3em;}" +
        H +
        ".comment a img {margin: 0 0 8px;}" +
        H +
        ".date {font-size: 13px; color: gray; text-decoration: none;}" +
        H +
        ".hcb-comment-tb button {font-size: 14px; color: #2096f3; text-decoration: none; font-weight: 600; border: none; padding: 0; margin-right: 4px; background: none; cursor: pointer;}" +
        H +
        ".hcb-comment-body {font-size: 14px; margin: 8px 0 0 0; padding: 0;}" +
        H +
        ".hcb-comment-tb {font-size: 13px; margin: 0; padding: 0;}" +
        H +
        ".approval-msg {opacity:0.9; color: red; font-style: italic;}" +
        H +
        "#hcb_form textarea, #HCB_comment_box #hcb_form #hcb_form_name_container {margin-bottom: 9px;}" +
        H +
        '#hcb_form textarea, #HCB_comment_box #hcb_form #hcb_form_name {font-family: "montserrat"; font-size: 14px; padding: 8px; margin: 0;}' +
        H +
        "#hcb_form .hcb-door-out {width: 28px;}" +
        H +
        "#hcb_form .hcb-door-in {width: 28px;}" +
        H +
        "#hcb_form .home-desc {margin-top: 12px;}" +
        H +
        "#hcb_form .home-desc a, #HCB_comment_box .home-desc a:visited {color: #6CA2FD; text-decoration: none;}" +
        H +
        "#hcb_form #hcb_subscribe {margin-top: 12px; display: inline-block;}" +
        H +
        "#hcb_form #hcb_settings {text-decoration: none; color: #333;}" +
        H +
        "#hcb_form #replying_to_container {font-size: 14px;color: gray;}" +
        H +
        "#hcb_form #hcb_subscribe input {display: inline;}" +
        H +
        '#hcb_form .btn, #HCB_comment_box #HCB_comment_form_box .btn {font-family: "montserrat"; letter-spacing: 0.25; border: 1px solid #353535; outline: 0; background: none; background-color: #353535; color: white; text-decoration: none; text-shadow: none; box-shadow: none; font-size: 14px; padding: 10px 16px; margin-right: 6px; font-weight: 500;}' +
        H +
        "#hcb_form .btn-secondary, #HCB_comment_box #HCB_comment_form_box .btn-secondary {border: 1px solid #353535; background-color: white; color: #353535;}" +
        H +
        ".gravatar{padding-right:2px}" +
        H +
        "input{margin-left:0}" +
        H +
        'input[type="file"]{display:none}' +
        H +
        "input.inputfile{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}" +
        H +
        "input.inputfile+label {display: inline}" +
        "</style>";
      h += '<p id="hcb_msg">' + (msg ? msg : "") + "</p>";
      if (get_option("top") && !stop()) {
        h += collapsed_link();
      }
      h += '<div id="comments_list">';
      if (comments.length === 0) {
        h += '<p id="no_comments">' + _hcb_user.no_comments_msg + "</p>";
      } else {
        for (var ii = 0; ii < comments.length; ii++) {
          i = get_option("top") ? ii : comments.length - 1 - ii;
          h += render_comment(comments[i]);
        }
      }
      h += "</div>";
      if (!get_option("top") && !stop()) {
        h += collapsed_link();
      }
      h += pagination;
      if (get_option("rss")) h += rss_link;
      hcb_wrapper.innerHTML = h;
      typeof _hcb_user.onload === "function" && _hcb_user.onload();
    },
    by = {};
  extend(hcb, {
    rsp_cb: function () {
      if (!(_hcb.rsp || {}).success) {
        alert((_hcb.rsp || {}).reason);
      }
    },
    approve: function (key) {
      comment = get_element("comment_" + key);
      for (i = 0; i < comment.childNodes.length; i++) {
        child = comment.childNodes[i];
        if (
          child &&
          child.className &&
          instr(child.className, "approval-msg")
        ) {
          remove_element(child);
        }
      }
      http_get("" + host + "/approve", "key=" + key + "&opts=" + opts);
    },
    del: function (key) {
      remove_element(get_element("comment_" + key));
      http_get("" + host + "/delete", "key=" + key + "&opts=" + opts);
    },
    flag: function (key) {
      if (!confirm(_hcb_user.are_you_sure)) return;
      var e = by_class(
        get_element("comment_" + key).children,
        "hcb-comment-tb"
      );
      remove_element(e.children[2]);
      http_get("" + host + "/flag", "key=" + key + "&opts=" + opts);
    },
    like: function (key) {
      var e = by_class(
        get_element("comment_" + key).children,
        "hcb-comment-tb"
      );
      remove_element(e.children[0]);
      var e = by_class(get_element("comment_" + key).children, "likes");
      e.children[0].innerText = (e.children[0].innerText || 0) * 1 + 1 + " ";
      e.style.display = "block";
      http_get("" + host + "/like", "key=" + key + "&opts=" + opts);
    },
    delta: function (event) {
      var el = event.target || event.srcElement;
      if (el.textLength === 0) {
        get_element("hcb_form_replies_to").value = "";
        var replyingTo = get_element("replying_to_container");
        if (replyingTo) replyingTo.remove();
      }
      if ((el.textLength || el.value.length) > _hcb_user.MAX_CHARS) {
        el.value = el.value.substr(0, _hcb_user.MAX_CHARS);
      }
    },
    submit: function (e) {
      e.preventDefault();
      var submit_el = get_element("hcb_submit");
      submit_el.disabled = true;
      if (get_option("field_email") && get_option("email_required")) {
        var email_el = get_element("hcb_form_email");
        if (
          !/^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,4}$/.test(
            email_el.value.toUpperCase()
          )
        ) {
          write_err(_hcb_user.err_bad_email);
          return false;
        }
      }
      var f, refer;
      for (var i = 0; i < fields.length; i++) {
        f = get_element("hcb_form_" + fields[i]);
        if (
          f &&
          (f.value === hcb_user[fields[i] + "_label"] || f.value == "")
        ) {
          f.value = fields[i] == "name" ? _hcb_user.anonymous : "";
        }
      }
      var reply_to =
          get_element("hcb_form_content").value.match(/@[^\n\s\,]+/) || [],
        uname;
      if (window.postMessage) {
        var form = get_element("hcb_form"),
          data = { ajax: !(_hcb_user.ajax === false) };
        for (i = 0; i < form.length; i++) {
          if (form[i].type === "checkbox" && !form[i].checked) continue;
          data[form[i].name] = form[i].value;
        }
        data.content = clean_string(data.content);
        if (!user.is_mod && opt_suspicious_policy && data.hcb_file) {
          alert(
            "Your comment contains an image. The HTML Comment Box Admin needs to approve your comment before it will be published to the public."
          );
        }
        xd_post(host + "/post", data);
        return false;
      } else {
        return true;
      }
    },
    reply: function (key) {
      if (!get_element("hcb_form_replies_to")) _hcb.make_comment_form();
      get_element("hcb_form_replies_to").value = key;
      var ta = get_element("hcb_form_content");
      ta.scrollIntoView(false);
      var user_name = by[key]
        .replace(" <i>(mod)</i>", "")
        .replace(" (mod)", "");
      if (user_name.includes("@")) {
        user_name = user_name.split("@")[0];
        user_name = user_name.replace(/\./g, " ");
      }
      ta.value = "@" + user_name + ", " + ta.value;
      var replyingTo = get_element("replying_to_container");
      if (replyingTo) {
        replyingTo.innerHTML =
          '<span id="replying_to_container"> is replying to ' +
          user_name +
          "</span>";
      } else {
        var pl = get_element("hcb_form_name_container");
        if (pl)
          pl.innerHTML =
            pl.innerHTML +
            '<span id="replying_to_container"> is replying to ' +
            user_name +
            "</span>";
      }
    },
    changepage: function (rel) {
      insert_script(page_link + "&pagenum=" + (pagenum + rel));
      var fb = get_element("HCB_comment_form_box");
      if (fb) fb.scrollIntoView(false);
    },
    https_redirect: function () {
      var alert_message =
        "Login is disabled for non-secure connections (http). Click OK to be redirected to a secure connection (https) and try to login again.";
      if (confirm(alert_message)) {
        var page_url = window.location.href;
        var secure_url = page_url.replace("http", "https");
        return window.location.replace(secure_url);
      }
    },
    make_comment_form: function () {
      var submit_html =
        '<input class="submit btn" id="hcb_submit" type="submit" value="' +
        _hcb_user.submit +
        '" />';
      if (new String(window.location).substring(0, 8) == "file:///")
        submit_html =
          '<input class="submit" id="hcb_submit" disabled="disabled" type="submit" value="Disabled (Publish First!)" />';
      var action_html = submit_html;
      var upload_image_html =
        '<input type="file" name="hcb_file" id="hcb_file" class="inputfile" title="upload image"><label id="hcb_file_label" for="hcb_file" title="upload image"><a class="btn btn-secondary">' +
        hcb_user.add_image +
        "</a></label>";
      if ("block" !== image_policy) {
        action_html += upload_image_html;
      }
      var login_html =
        '<div style="float:right"><small class="admin-link"><a href="' +
        auth_link +
        '">' +
        (user.name ? _hcb_user.logout_link : _hcb_user.admin_link) +
        "</a>&nbsp;</small></div>";
      var page_url = window.location.href;
      if (!user.name && !page_url.startsWith("https")) {
        login_html =
          '<div style="float:right"><small class="admin-link"><a href="#" onclick="hcb.https_redirect()">' +
          _hcb_user.admin_link +
          "</a>&nbsp;</small></div>";
      }
      if (auth_link && !_hcb_user.iframe) {
        action_html += login_html;
      }
      var f = '<form id="hcb_form" onsubmit="hcb.submit(event)">';
      f +=
        hiddenfield("page", page) +
        '<input type="hidden" id="hcb_refer" name="refer" value="' +
        (instr("" + page, "mosso")
          ? _document.referrer
          : window.location +
            "" +
            (window.location.hash ? "" : "#HCB_comment_box")) +
        '" />' +
        hiddenfield("opts", opts) +
        hiddenfield("mod", mod) +
        hiddenfield("replies_to", "") +
        hiddenfield("charset", get_charset());
      f += textfield("name", user.name);
      if (get_option("field_website")) f += textfield("website", "");
      if (get_option("field_email")) f += textfield("email", user.email);
      var s = "";
      f +=
        '<div class="hcb-wrapper">' +
        shadow_start +
        '<textarea onkeyup="hcb.delta(event)" class="commentbox hcb-shadow-r" name="content" id="hcb_form_content" rows="4" ' +
        s +
        " " +
        (get_option("watermark")
          ? ' placeholder="' + _hcb_user["content_label"] + '"'
          : "") +
        "></textarea>" +
        shadow_end +
        "</div>" +
        "<div>" +
        action_html +
        "</div>";
      if (!removed_backlink) {
        f +=
          '<div class="home-desc">Not using&nbsp;<a target="_blank" target="_blank" href="' +
          host +
          '">Html Comment Box</a><span class="home-desc">&nbsp; yet?</a>';
        if (user.is_mod) {
          f +=
            '<small class="admin-link"><a href="' +
            host +
            '/pricing.html" title="remove link" target="_blank"><img src="' +
            host +
            '/static/images/link_delete.png" alt="remove link" class="hcb-icon" /></a></small> ';
        }
        f += "</div>";
      }
      if (get_option("replies") && (get_option("field_email") || user.email)) {
        f +=
          '<label id="hcb_subscribe"><input type="checkbox" name="subscribe" ' +
          (user.subscribed ? "checked" : "") +
          "/><span> " +
          _hcb_user.subscribe +
          "</span></label>";
      }
      if (user.email) {
        f +=
          '&nbsp;&nbsp;<small><a id="hcb_settings" href="' +
          host +
          '/account.html" title="account" target="_blank"><img src="' +
          host +
          '/static/images/cog.png" alt="account" class="hcb-icon"/> Settings</a></small>';
      }
      f += "</form>";
      get_element("HCB_comment_form_box").innerHTML = f;
      _hcb.interactive_file_elements();
    },
    interactive_file_elements: function () {
      var inputs = document.querySelectorAll(".inputfile");
      Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling;
        input.addEventListener("change", function (e) {
          var fileName = e.target.value.split("\\").pop();
          if (fileName) {
            label.innerHTML = fileName;
          }
        });
      });
    },
  });
  var posted = false;
  init();
  if (!get_option("collapse") && !stop() && !posted) {
    _hcb.make_comment_form();
  }
})();
