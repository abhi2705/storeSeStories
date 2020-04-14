import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-nav',
  templateUrl: './blog-nav.component.html',
  styleUrls: ['./blog-nav.component.scss']
})
export class BlogNavComponent implements OnInit {

  blogs:Array<any>

  constructor() {
    this.blogs=new Array<any>()
  }

  ngOnInit(): void {
      this.blogs=[
        {
          "blog-url":"#",
          "image-url":"https://www.webnode.com/blog/wp-content/uploads/2019/04/blog2.png",
          "date":"xyz",
          "content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          "Tag":"TAGTAG"
        },
        {
          "blog-url":"#",
          "image-url":"https://www.webnode.com/blog/wp-content/uploads/2019/04/blog2.png",
          "date":"xyz",
          "content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          "Tag":"TAGTAG"
        },
        {
          "blog-url":"#",
          "image-url":"https://www.webnode.com/blog/wp-content/uploads/2019/04/blog2.png",
          "date":"xyz",
          "content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          "Tag":"TAGTAG"
        },
        {
          "blog-url":"#",
          "image-url":"https://www.webnode.com/blog/wp-content/uploads/2019/04/blog2.png",
          "date":"xyz",
          "content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          "Tag":"TAGTAG"
        }
      ]


  }

  get_duration(){
    const date2 = new Date();
    return date2;

  }

}
