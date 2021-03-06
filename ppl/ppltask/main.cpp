#include <iostream>
#include <ppltasks.h>
#include <functional>
#include <memory>

using namespace std;
using namespace concurrency;




class Context {

};

class Next;
typedef  std::shared_ptr<Next> NextPtr;

typedef std::shared_ptr<Context> ContextPtr;
typedef task<void> task0;
typedef std::function<task0(ContextPtr, NextPtr)> Handler;

class Next :public std::enable_shared_from_this<Next>
{
	typedef std::shared_ptr<Next> Pointer;
public:

	Next(const std::vector<Handler>& h) :handlers(h) {

	};

	static Pointer Create(const std::vector<Handler>& h) {
		return std::make_shared<Next>(h);
	}

	task0 call(ContextPtr ctx) {
		it = handlers.begin();
		return (*this)(ctx);
	}

	task0 operator()(ContextPtr ctx) {
		it++;
		if (it != handlers.end()) {
			return (*it)(ctx, shared_from_this());
		}
		else {

		}
	}

	std::vector<Handler>::iterator it;
	std::vector<Handler> handlers;
};

class Application {
public:
	task0 handle(ContextPtr ctx){
		return Next::Create(handlers)->call(ctx);
	}
	void use(Handler h) {
		handlers.push_back(h);
	}

	std::vector<Handler> handlers;
};
typedef std::shared_ptr<Application> ApplicationPtr;


auto api1 = [](ContextPtr ctx, NextPtr next)->task0 {
	return create_task([]() {});
};


void main()
{
	auto ctx = std::make_shared<Context>();
	api1(nullptr, nullptr).get();
	Application app;
	app.use(api1);
	app.handle(ctx);
	std::cout << "hello world" << std::endl;
}